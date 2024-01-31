/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'
import ProjectsController from '#controllers/projects_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {

  router.group(() => {
    router.get('/', [ProjectsController, "index"])

  }).prefix('/projects')
  // projects routes
}).prefix('/api/v1')

  router.group(() => {
    router.post('/login', [AuthController, "login"])
    router.post('/register', [AuthController, "register"])
    router.get('/me', [AuthController, "me"])
    router.delete('/logout', [AuthController, "logout"])
  }).prefix('/auth')

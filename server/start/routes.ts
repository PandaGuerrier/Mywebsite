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
import { middleware } from '#start/kernel'
import ContactsController from '#controllers/contacts_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {

  router.group(() => {
    router.get('/:isPublished', [ProjectsController, "index"])
    router.get('/show/:id', [ProjectsController, "show"])
    router.post('/', [ProjectsController, "store"]).use(middleware.auth())
    router.put('/:id', [ProjectsController, "update"]).use(middleware.auth())
    router.delete('/:id', [ProjectsController, "destroy"]).use(middleware.auth())

  }).prefix('/projects')

  router.post('/contact', [ContactsController, "create"])
  // projects routes
}).prefix('/api/v1')

  router.group(() => {
    router.post('/login', [AuthController, "login"])
    router.post('/register', [AuthController, "register"])
    router.get('/me', [AuthController, "me"])
    router.delete('/logout', [AuthController, "logout"])
  }).prefix('/auth')

const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "TITLE", uid: "title", sortable: true},
  {name: "DESCRIPTION", uid: "description", sortable: true},
  {name: "IS PUBLISHED", uid: "is_published", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Active", uid: "true"},
  {name: "Paused", uid: "false"},
];


export {columns, statusOptions};

/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const LoginController = () => import('#controllers/login_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
router.on('/').renderInertia('home')
const UsersController = () => import('#controllers/users_controller')

router.get('/admin/users', [UsersController, 'index']).use(middleware.auth()).use(middleware.auth())

router
  .group(() => {
    router.get('/login', [LoginController, 'show']).as('login.show')
    router.post('/login', [LoginController, 'store']).as('login.store')
  })
  .prefix('/auth')

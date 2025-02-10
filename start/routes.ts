/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const LoginController = () => import('#controllers/login_controller')
const LogoutsController = () => import('#controllers/logouts_controller')
const ResetPasswordsController = () => import('#controllers/reset_passwords_controller')
const AsksController = () => import('#controllers/asks_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
router.on('/').renderInertia('home')
const UsersController = () => import('#controllers/users_controller')

// admin routes
router
  .group(() => {
    router.get('/', () => 'dashboard').as('admin')
    router.get('/asks', () => 'asks').as('admin:asks')
    router
      .group(() => {
        router.get('/', [UsersController, 'index']).as('admin:users')
        router.get('/create', [UsersController, 'createUser']).as('admin:users-create')
        router.post('/create', [UsersController, 'store'])
      })
      .prefix('/users')
  })
  .prefix('/admin')
  .use(middleware.admin())

// auth routes
router
  .group(() => {
    router.get('/login', [LoginController, 'show']).as('auth:login')
    router
      .get('/forgot-password', [ResetPasswordsController, 'forgotPassword'])
      .as('auth:forgot-password')
    router
      .get('/reset-password', [ResetPasswordsController, 'resetPassword'])
      .as('auth:reset-password')
    router.post('/forgot-password', [ResetPasswordsController, 'handleForgotPassword'])
    router.post('/reset-password', [ResetPasswordsController, 'handleResetPassword'])

    router.post('/login', [LoginController, 'store'])
  })
  .prefix('/auth')
  .use(middleware.guest())

router.post('/auth/logout', [LogoutsController, 'handle']).use(middleware.auth())

router
  .group(() => {
    router.get('/', [AsksController, 'index']).as('asks')
    router.get('/create', [AsksController, 'createAsk']).as('asks:create')
    router.post('/create', [AsksController, 'store'])
    router.get('/:id', [AsksController, 'show']).as('asks:show')
  })
  .prefix('/asks')
  .use(middleware.auth())

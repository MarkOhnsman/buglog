import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import BaseController from '../utils/BaseController'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async create(req, res, next) {
    try {
      // DO NOT TRUST THE CLIENT
      req.body.creatorId = req.userInfo.id
      const bug = await bugsService.create(req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }
}

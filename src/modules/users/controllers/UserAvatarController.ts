import { Request, Response } from 'express'

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

export default class UsersAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService()

    const user = updateAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    })
    return res.json(user)
  }
}

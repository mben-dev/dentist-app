import Ask from '#models/ask'
import File from '#models/file'
import env from '#start/env'

import { store } from '#validators/ask'
import type { HttpContext } from '@adonisjs/core/http'

export default class AsksController {
  async index({ inertia, auth }: HttpContext) {
    let query = {}
    if (auth?.user?.role !== 'admin') {
      query = { userId: auth?.user?.id }
    }
    const asks = await Ask.query(query)
    return inertia.render('asks/index', { asks }, { title: 'Dossier de traitement' })
  }

  createAsk({ inertia }: HttpContext) {
    return inertia.render('asks/create-ask/index', {}, { title: 'Créer une demande de traitement' })
  }

  async store({ request, response, session, auth }: HttpContext) {
    const { files, ...payload } = await request.validateUsing(store)

    console.log(auth.user, 'OKDOEKPZOJDPOIZEJ')
    const createdAsk = await Ask.create({ ...payload, userId: auth!.user!.id! })

    if (!files || files.length === 0) {
      return response.badRequest({ message: 'Aucun fichier fourni' })
    }

    try {
      await Promise.all(
        files.map(async (file) => {
          if (!file.isValid) {
            throw new Error(`Fichier invalide : ${file.clientName}`)
          }

          const fileName = `${file.clientName}.${file.extname}`
          const filePath = `${env.get('APP_NAME')}/asks/${createdAsk.id}/${fileName}`

          file.moveToDisk(filePath)

          await File.create({
            askId: createdAsk.id,
            path: filePath,
            filename: file.clientName,
            mimeType: file.type,
            size: file.size,
            type: 'INPUT',
          })
        })
      )

      session.flash('success', 'Demande de traitement crée avec succès')
      response.redirect().toRoute('asks')
    } catch (error) {
      console.error(error)
      return response.internalServerError({ message: 'Erreur lors de l’upload des fichiers' })
    }
  }

  async show({ request, response, session, inertia }: HttpContext) {
    const id = request.param('id')
    const ask = await Ask.query().where('id', id).preload('files').firstOrFail()
    let signedUrl: { name: string; url: string }[] = []
    for (const file of ask.files) {
      signedUrl = [...signedUrl, { name: file.filename, url: await file.generateSignedUrl() }]
    }
    if (!ask) {
      session.flash('error', "Ce dossier n'existe pas")
      response.redirect().toRoute('asks')
    }

    return inertia.render(
      'asks/[id]/index',
      { ask: { ...ask.toJSON(), signedUrl } },
      { title: `dossier ${ask?.patientId}` }
    )
  }
}

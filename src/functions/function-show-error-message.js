import { Dialog, Loading } from 'quasar'

export function showErrorMessage(erroMessage){
    Loading.hide()
    Dialog.create({
        title:'Error',
        message:erroMessage
    })
}
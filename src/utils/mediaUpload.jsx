import { createClient } from "@supabase/supabase-js"

const url = "https://hvlsxakzamctdvosmasa.supabase.co"
const key = "sb_publishable_iE2zjpaNA3wtKaFrpV41cA_j-8SotMJ"

const supabase = createClient(url, key)

export default function mediaUpload(file) {


    const mediaUploadPromise = new Promise(
        (resolve, reject) => {

            if (file == null) {
                reject("No file provided")
            }

            const timestamp = new Date().getTime()
            const newName = timestamp + file.name

            supabase.storage.from("images").upload(newName, file, {
                upsert: false,
                cacheControl: "3600"
            }).then(() => {

                const publicUrl = supabase.storage.from("images").getPublicUrl(newName).data.publicUrl
                console.log(publicUrl)
                resolve(publicUrl)

            }).catch((err) => {

                console.log(err)
                reject("Error occurred in database connectivity")

            })

        }
    )

    return mediaUploadPromise

}

// mediaUpload(image)
var Botkit = require ('Botkit')

var accessToken = process.env.FACEBOOOK_PAGE_ACCESS_TOKEN
var verifyToken = process.env.FACEBOOK_VERIFY_TOKEN
var port = process.env.PORT 

if (!accessToken) throw new Error('FACEBOOOK_PAGE_ACCESS_TOKEN is require but missing')
if (!verifyToken) throw new Error('FACEBOOK_VERIFY_TOKEN is require but missing')
if (!port) throw new Error('PORT is require but missing')

var controller = Botkit.facebook({

	access_token: accessToken,
	verify_token: verify_token

})	

var bot = controller.spawn()

controller.setupWebserver(port, function(err, webserver) {
	if (err) return console.log(err)
		controller.createWebhookEndPoints(webserver, bot, function(){
		console.log('Listo Entrada')
		})
})

controller.hears(['hi', 'hola', 'hello!', ':)', 'hi!', 'Hi!', 'Hello', 'Hello!'], 'message_recived', function(bot, message){

	bot.reply(message, '!Hola Bienvenido a SOLO NAVES¡')
	bot.reply(message, 'Somos Alienigenas y queremos mostrarte algo...')
	bot.reply(message, {

		attachment: {
			type: 'template',
			payload: {
				template_type: 'button',
				text: 'Que tipo de NaVe deseas ver:',
				buttons: [
					{
						type: 'postback',
						title: 'Deportivo',
						payload: 'mostrar_deportivo'
					},
						{
						type: 'postback',
						title: 'Camioneta',
						payload: 'mostrar_camioneta'
					},
					{
						type: 'postback',
						title: 'Sedan',
						payload: 'mostrar_sedan'
					},
					{
						type: 'postback',
						title: 'Hashback',
						payload: 'mostrar_hashback'
					}
				]
			}
		}
	})
})

controller.on ('facebook_postback', function (bot, message) {
	switch (message.payload) {
		case 'mostrar_deportivo':
		bot.reply(message, {
			attachment: {
				type: 'image',
				payload: {
					url: 'https://media.giphy.com/media/YVoVTVZVhaVQA/giphy.gif'
				}
			}
		})
		break
	}
})
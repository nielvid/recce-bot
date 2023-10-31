const { App } = require('@slack/bolt')
require('dotenv').config()

const app = new App({
  token: process.env.SLACK_BOT_TOKEN, //Find in the Oauth  & Permissions tab
  signingSecret: process.env.SLACK_SIGNING_SECRET, // Find in Basic Information Tab
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
})

app.command('/info', async ({ command, ack, say, respond }) => {
  try {
    await ack()
    //await respond(`${command.text}`)
    say('Yaaay! that command works!')
  } catch (error) {
    console.log('err')
    console.error(error)
  }
})

app.message('hello', async ({ command, say }) => {
  // Replace hello with the message
  try {
    say("Hi! Thanks for PM'ing me!")
    say('Yaaay! that command works!')
  } catch (error) {
    console.log('err')
    console.error(error)
  }
})

// matches any string that contains the string hey
app.message(/i/, async ({ command, say }) => {
  try {
    say('Yaaay! that command works!')
  } catch (error) {
    console.log('err')
    console.error(error)
  }
})

// respond to any thing that is entered
app.message('', async ({ command, say }) => {
  try {
    // say() sends a message to the channel where the event was triggered
    await say(`See ya later :wave:`)
  } catch (error) {
    console.log('err')
    console.error(error)
  }
})
const start = async () => {
  await app.start(process.env.PORT || 3000) // Launch the bot
  console.log('⚡️ Bolt app is running!')
}

// Find conversation ID using the conversations.list method
async function findConversation(name) {
  try {
    // Call the conversations.list method using the built-in WebClient
    const result = await app.client.conversations.list()
   
    for (const channel of result.channels) {
      if (channel.name === name) {
        conversationId = channel.id;

        // Print result
        console.log("Found conversation ID: " + conversationId);
        // Break from for loop
        break;
      }
    }
  } catch (error) {
    console.error(error)
  }
}

// Find conversation with a specified channel `name`



// Post a message to a channel your app is in using ID and message text
async function publishMessage(id, text) {
  try {
    // Call the chat.postMessage method using the built-in WebClient
    const result = await app.client.chat.postMessage({
      channel: id,
      text: text
      // You could also use a blocks[] array to send richer content
    });

    // Print result, which includes information about the message (like TS)
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
}



publishMessage('C01061Y5HA5', 'testing post message :tada:')

start().catch((err) => console.log('cannot start app'))

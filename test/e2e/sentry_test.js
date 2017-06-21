import assert from 'assert'
import request from 'request'

function getEvent(id, wait=2000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      request.get({
        url: `https://sentry.io/api/0/projects/dictav/js-columbidae/events/${id}/`,
        headers: { 'Authorization': 'Bearer ' + process.env.SENTRY_AUTH_TOKEN },
        timeout: 5000
      }, (err, res) => {
        if (err) {
          reject(err)
          return
        }

        if (res.statusCode != 200) {
          reject(new Error(`id:${id} status:${res.statusCode}`))
          return
        }

        try {
          resolve(JSON.parse(res.body))
        } catch(err) {
          reject(err)
        }
      })
    }, wait)
  })
}

describe('Sentry', () => {
  it('send error', () => {
    browser.url('http://9ed5b700.ngrok.io')
    const eventId = browser.execute(`return window.eventId`).value

    const test = () => getEvent(eventId)
      .catch(err => assert.fail(`should retrive the event: ${eventId}`))
    browser.call(test)
  })
})

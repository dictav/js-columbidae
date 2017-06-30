import assert from 'assert'
import request from 'request'

const maxRetry = 5

function getEvent(id, wait=1000, count=0) {
  if (!id) {
    return Promise.reject(new Error("id is null"))
  }

  if (count == 0) {
    console.log(`fetching ${id}...`)
  }

  if (count > maxRetry) {
    return Promise.reject(new Error("over maxRetry"))
  }

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

        if (res.statusCode == 404) {
          console.log('retry', count+1)
          return resolve(getEvent(id, wait * 2, count+1))
        }

        if (res.statusCode != 200) {
          return reject(new Error(`id:${id} status:${res.statusCode}`))
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
    browser.url(process.env.URL1 || 'http://localhost:3000')
    const eventId = browser.execute(`return window.eventId`).value

    const test = () => getEvent(eventId)
      .catch(err => assert.fail(`should retrive the event: ${eventId} err: ${err}`))
    browser.call(test)
  })
})

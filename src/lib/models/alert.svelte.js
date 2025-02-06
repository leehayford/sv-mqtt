export class Alert {
    headline = $state("")
    message = $state("")
    code = $state(3)

    parse = (msg) => {
        let js = JSON.parse(msg)

        this.headline = js.headline
        this.message = js.message
        this.code = js.code
    }

    toJson = () => {
        return {
            headline: this.headline,
            message: this.message,
            code: this.code
        }
    }
}

/*
Topic: .../sig/alert

Message: SUCCESS
{
  "headline": "success headline",
  "message": "this is some kind of success message",
  "code": 1
}
  
Message: WARNING
{
  "headline": "warning headline",
  "message": "this is some kind of warning message",
  "code": 2
}
  
Message: WARNING
{
  "headline": "error headline",
  "message": "this is some kind of error message",
  "code": 3
}

*/
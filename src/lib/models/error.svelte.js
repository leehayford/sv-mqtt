export class Error {
    message = $state("")
    code = $state(3)

    parse = (msg) => {
        let js = JSON.parse(msg)

        this.message = js.message
        this.code = js.code
    }

    toJson = () => {
        return {
            message: this.message,
            code: this.code
        }
    }
}

/*
Topic: esp32/sig/error

Message: SUCCESS
{
  "message": "this is some kind of sucess message",
  "code": 1
}
  
Message: WARNING
{
  "message": "this is some kind of warning message",
  "code": 2
}
  
Message: WARNING
{
  "message": "this is some kind of error message",
  "code": 3
}

*/
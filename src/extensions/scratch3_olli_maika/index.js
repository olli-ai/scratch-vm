const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const formatMessage = require('format-message');


/**
 * Icon svg to be displayed in the blocks category menu, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const menuIconURI = 'data:image/png;base64,UklGRowDAABXRUJQVlA4TIADAAAvUcAJED/mqJEkR4qaPfM6/lxt0nDURpIkOWu+s/whLoa5KgN2ZNttG10AT0ySnP3nIuz++3ALOQMgDZrvBDsNyL/z4cWLb++D5jUPrO7kWl+/80YONTK6NC63KHp+NJGoaA6iY03Ob5Ho5/eZbjttR81knmgAOAsAMJOzAht/ALiCIURHIGIIwxAiYQgJgNEhhJA6wPwDsOBQnILLrm4MCPGs4BQJ+qOBX4EigUZRx1ASk8AvFVc0Ms2HABSReExndUrE+VEBrJaNAxMHbow4EhUiPWlmnuGfwT7MuuPu2/s5KLkQcYgh3TQrR5PDsg0cmGo6rLG/BhKmSY2kHPt21qnG7ePK3L6Vv3I7nxtBorVthhzVeGLbySgV27aTRpzOGtF6s7Zt27btva8+9VdqqvsCIvrPwG0jRe4x89wbEDX2+CMzje0ixvJI4YYPt/2Q5rF8WNYtYEr6cpd/8tdWwI8qMIU64eI3Hw3ZVw5JmCFSz1ajZv5UCpgx/ZORGnE2YfZIdcGaeNokYW+amhQo9TyZVf9Vv8FB7DKonoGDOEyyVWNahOycvLzuQZHanDMB8ZhMQbrqNSZz3qg6jsmcJp/WWZmit3Tv/RiPJ+7rjhsybYUtgbw9yKAsUfLdikBM7xdQFhiN48xnAi6UtSkUUXNrRT+cdMGHr4/wsmaeNKA54rstA75iX/iQ2i49RAj5lmGSvJnhXfeZhZftmoGHeYciiHuVfBNYwvS832kF5v/z1oGWsx8d6H/SE9VBGfQ/I6a8FUkZj70VFmJEEacaMq+qrmFSuZWNuR6TWe0t04vtFZ1gkQawr32IMRuBWn8vvRFpq+WQshNZvQPagjhuSCR1u1glwicwhSNMyr/Fyo1B0nQoiv9I+y9WCfxG9L1II9jQflZrgWIfjmYwmQkfxkpfBKxDHL2Fb/9LNu9F0sBznmLBDFzjYPF3ESaN/+eG61eU65f+A/xDGNxlmIvfmkz4pX+EuLJUSbDZGU4Xur4Xk6Qpf84V88cAhjPL7/tQvp+viilVOC8acRYwLWCYgYn9CRG3bv18vnsprapLZ8IcRJ4DzbcdDscx4HKow+E4Ae+zw+HrzZ8HTbdCJg9ewzFFUbpg5VbUdALZikLUhHuLJayjXCFmRi7UH/S0WtAdZJsekPQGBfwoE/QGIevR68OiziD0/+6ec+MdotauAA==';

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/png;base64,UklGRowDAABXRUJQVlA4TIADAAAvUcAJED/mqJEkR4qaPfM6/lxt0nDURpIkOWu+s/whLoa5KgN2ZNttG10AT0ySnP3nIuz++3ALOQMgDZrvBDsNyL/z4cWLb++D5jUPrO7kWl+/80YONTK6NC63KHp+NJGoaA6iY03Ob5Ho5/eZbjttR81knmgAOAsAMJOzAht/ALiCIURHIGIIwxAiYQgJgNEhhJA6wPwDsOBQnILLrm4MCPGs4BQJ+qOBX4EigUZRx1ASk8AvFVc0Ms2HABSReExndUrE+VEBrJaNAxMHbow4EhUiPWlmnuGfwT7MuuPu2/s5KLkQcYgh3TQrR5PDsg0cmGo6rLG/BhKmSY2kHPt21qnG7ePK3L6Vv3I7nxtBorVthhzVeGLbySgV27aTRpzOGtF6s7Zt27btva8+9VdqqvsCIvrPwG0jRe4x89wbEDX2+CMzje0ixvJI4YYPt/2Q5rF8WNYtYEr6cpd/8tdWwI8qMIU64eI3Hw3ZVw5JmCFSz1ajZv5UCpgx/ZORGnE2YfZIdcGaeNokYW+amhQo9TyZVf9Vv8FB7DKonoGDOEyyVWNahOycvLzuQZHanDMB8ZhMQbrqNSZz3qg6jsmcJp/WWZmit3Tv/RiPJ+7rjhsybYUtgbw9yKAsUfLdikBM7xdQFhiN48xnAi6UtSkUUXNrRT+cdMGHr4/wsmaeNKA54rstA75iX/iQ2i49RAj5lmGSvJnhXfeZhZftmoGHeYciiHuVfBNYwvS832kF5v/z1oGWsx8d6H/SE9VBGfQ/I6a8FUkZj70VFmJEEacaMq+qrmFSuZWNuR6TWe0t04vtFZ1gkQawr32IMRuBWn8vvRFpq+WQshNZvQPagjhuSCR1u1glwicwhSNMyr/Fyo1B0nQoiv9I+y9WCfxG9L1II9jQflZrgWIfjmYwmQkfxkpfBKxDHL2Fb/9LNu9F0sBznmLBDFzjYPF3ESaN/+eG61eU65f+A/xDGNxlmIvfmkz4pX+EuLJUSbDZGU4Xur4Xk6Qpf84V88cAhjPL7/tQvp+viilVOC8acRYwLWCYgYn9CRG3bv18vnsprapLZ8IcRJ4DzbcdDscx4HKow+E4Ae+zw+HrzZ8HTbdCJg9ewzFFUbpg5VbUdALZikLUhHuLJayjXCFmRi7UH/S0WtAdZJsekPQGBfwoE/QGIevR68OiziD0/+6ec+MdotauAA=='

/**
 * The url of the translate server.
 * @type {string}
 */
const serverURL = 'https://users-dev.jenkins-x-viettel.iviet.com';

/**
 * How long to wait in ms before timing out requests to translate server.
 * @type {int}
 */
const serverTimeoutMs = 10000; // 10 seconds (chosen arbitrarily).

/**
 * Class for the translate block in Scratch 3.0.
 * @constructor
 */
class MaikaControllerBlocks {
    constructor (runtime) {
        this.runtime = runtime;
        this.token = '';
    }

    /**
     * The key to load & store a target's translate state.
     * @return {string} The key.
     */
    static get STATE_KEY () {
        return 'Scratch.maika';
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'maika',
            name: formatMessage({
                id: 'maika.categoryName',
                default: 'Control Maika',
                description: 'Name of extension that adds Maika blocks'
            }),
            blockIconURI: blockIconURI,
            menuIconURI: menuIconURI,
            blocks: [
                {
                    opcode: 'sendMessage',
                    text: formatMessage({
                        id: 'maika.sendMessage',
                        default: 'yêu cầu loa [CALLING_NAME]: [UTTERANCE]',
                        description: 'Yêu cầu maika thực hiện một lệnh gì đó'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        UTTERANCE: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'maika.defaultCommand',
                                default: 'mở nhạc',
                                description: 'mở nhạc: yêu cầu mặc định'
                            })
                        },
                        CALLING_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "Maika"
                        }
                    }
                },
                {
                    opcode: 'login',
                    text: formatMessage({
                        id: 'maika.login',
                        default: 'email [EMAIL] hoặc số điện thoại [PHONE_NUMBER], mật khẩu: [PASSWORD]',
                        description: 'Đăng nhập vào tài khoản Maika'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        EMAIL: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'maika.email',
                                default: 'example@gmail.com',
                                description: 'Email'
                            })
                        },
                        PHONE_NUMBER: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'maika.phoneNumber',
                                default: '+84...',
                                description: 'Số điện thoại'
                            })
                        },
                        PASSWORD: {
                            type: ArgumentType.STRING,
                            defaultValue: "mật khẩu"
                        }
                    }
                },
            ],
        };
    }
    sendMessage(args){
        fetch(serverURL + '/v1/user-device/control', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.token,
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({calling_name: args.CALLING_NAME, utterance: args.UTTERANCE}) // body data type must match "Content-Type" header
          }).then(response => {
              return response.json().message
          });
        }
    login(args){
        var endpoint = args.EMAIL ? '/v1/auth/login': '/v1/auth/otp/login';
        fetch(serverURL + endpoint, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({email: args.EMAIL, phone_number: args.PHONE_NUMBER, password: args.PASSWORD})
        }).then(response => { response.json().then(data => {
            this.token = data.data.access_token;
            console.log(this.token);
        })});
    }
}

module.exports = MaikaControllerBlocks;

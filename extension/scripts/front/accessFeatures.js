/***************************************************************\
 *                        ____   ________    ____               *
 *           ||\\   ||  //   \\     ||     ||                   *
 *           || \\  || ||     ||    ||     ||__                 *
 *           ||  \\ || ||     ||    ||     ||                   *
 *           ||   \\||  \\___//     ||     ||____               *
 *                                                              *
 * You can add new function by the function bot in main code.   *
 * You will have to create a command format. User's input will  * 
 * be stored in input variable. Parse the input variable for    *
 * your command and if it matches you can send a message to     *
 * background.js with message of the following form:            *
 *                                                              *
 * {                                                            *
 *   feature_name: "name of feature",                           *
 *   feature_params: {                                          *
 *     parameter1: "parameter1",                                *
 *     ...,                                                     *
 *     parameterN: "parameterN"                                 *
 *   }                                                          *
 * }                                                            *
 *                                                              *
 * In background detect for this message by feature_name and    *
 * then execute any command or call other executable file       *
 * (should be present in extension > scripts > features).       *
 *                                                              *
 *                                                              *
 * AND DO NOT REMOVE THE EXAMPLE TEMPLATES WRITTEN.             *
 *                                                              *
 *                                                              *
 \**************************************************************/

/**** MAIN CODE ****/

function bot(input) {
  alert("entered " + input);

  /*
    if(input === "hello" ){
        chrome.runtime.sendMessage({
            featureName: "intro",
            featureParams: {
                reply: "Hi"
            }
        });
    }
*/
}

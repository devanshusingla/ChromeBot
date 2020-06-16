## Adding your features.

You can also add your own features in this bot. You can exploit server to add things to your system and the chrome extension to change display of browser or gain information about the browser, current open website, etc.

Mainly it will involve following steps:-

1. Detect your command through `server/scripts/detectCommand.js`. If detected send json response with

   - `type` attribute having value `feature`
   - `featureName` attribute having a unique name for your feature to detect it in extension code.
   - `featureType` attribute to make extension if feature wants to access resources or is providing resources.

2. Detect first response of feature detected by server, by using featureName in `extension/scripts/front/handleFeatures.js` and call a function representing your feature present in separate javascript file, say feature.js, in `extension/scripts/front/features`.

3. You can send multiple get, post, etc requests from the feature.js to server with url as `featureURL + "feature name/..."` and the server can detect these requests and send responses.

4. These requests will be detected using express router. The server implementation of your feature will be stored in a folder named with your feature inside `server/scripts/features`. It will contain an `index.js` file which will export express router detecting the various requests pertaining to your feature.

5. Add your file (feature.js) in `manifest.json` where other content scripts are present.

6. You can always use other resources like from `chatSystem.js, std.js` present in extension or other feature api's by sending xmlHttpRequests to that feature.

**NOTE:** As an example please see the codeforces feature.

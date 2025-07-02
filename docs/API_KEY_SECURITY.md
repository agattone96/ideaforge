# API Key Security Warning

**Warning:** The Gemini API key is exposed to the client and is not secret. Restrict your key in Google Cloud Console to only allow requests from your app's domain. See:

- https://cloud.google.com/docs/authentication/api-keys#securing_an_api_key

Never use a production key with broad permissions. Always restrict by HTTP referrer and API scope.

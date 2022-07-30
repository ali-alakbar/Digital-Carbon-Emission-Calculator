# Font Changer Project Flux - Yoga

Font Changer is a web browser extension that allows you to change the font of your choice.
This Font Changer works on every site you visit.

This extension is heavily inspired by the Web Browser Extension Store [Font Changer Plus] and [Font Changer](www.fontsly.com)

A few points of caution:

- If you have just installed it and the font on the website you are visiting has not changed, please reload the website you are visiting first, then use this web browser extension font changer.
- If you change the content and function, don't forget to reload the extension developer mode so that it can be seen
  changes that have been made.

### Extension permission

To work, the extension uses the following permissions:

- fontSettings : Use the fontSettings API to manage Chrome font settings. (https://developer.chrome.com/docs/extensions/reference/fontSettings/)
- "https://_/_", "http://_/_" : used to access the visited URL to be changed.
- storage : Use the storage API to store, retrieve, and track changes to user data. (https://developer.chrome.com/docs/extensions/reference/storage/)

## Testing

To directly use the extension with locally made modifications:

- Go to Chrome settings > More tools > Extensions. Enable Developer Mode.
- Click "Load unpackaged extensions" and select the folder where the source code is located.

## Folders

- \_locale : Specifies the \_locales subdirectory containing the default string for this extension. (https://developer.chrome.com/docs/extensions/mv2/manifest/default_locale/)
- img : A collection of images or icons used for the needs of making extensions
- lib : Contains Jquery files, a lightweight JavaScript library. (https://www.w3schools.com/jquery/jquery_intro.asp)

## Files

- manifest.json : Extensions, themes, and applications are simply a collection of resources, wrapped in a manifest.json file that describes the package contents. (https://developer.chrome.com/docs/extensions/mv2/manifestVersion/)

* Resources used in this manifest extension:

* browser_action : Use the browser action to place the icon in Google Chrome's main toolbar, to the right of the address bar. In addition to the icon , browser actions can have tooltips , badges , and popups .
  (https://developer.chrome.com/docs/extensions/reference/browserAction/)

      * popup.html : Program created to display the extension created.
      * font.logic.js : Program to create an external display that is created when clicked to interact with 		background scripts.

* background : an event based program used to modify or improve the Chrome browsing experience. Events are browser triggers, such as opening a new page, deleting a bookmark, or closing a tab. The extension monitors these events in its background script, then reacts with the specified instructions.
  (https://developer.chrome.com/docs/extensions/mv2/background_pages/)

      * background.js : Program created to monitor events in the background and then react with the specified instructions.

* content_scripts : files that run in the context of a web page. Using the standard Document Object Model (DOM), they can read the details of the web pages the browser visits, make changes, and pass information to their parent extensions. (https://developer.chrome.com/docs/extensions/mv2/content_scripts/)

  - inject.js : Program created to make changes, and pass information to its parent extension.

Information :

- Fonts used from API (https://webfonts.googleapis.com/v1/webfonts?sort=SORT_UNDEFINED&key=AIzaSyB69SADmp8KnBcOkoYAiIqnStqXj058R3M)
  which is obtained from execute sort : SORT_UNDEFINED (https://developers.google.com/fonts/docs/developer_api/)

- I did this task by doing research from Github, Google, Youtube. And collect some open source code needed for making this program. Then try and combine them into the current program.

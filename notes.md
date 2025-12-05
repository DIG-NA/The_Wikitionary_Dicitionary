// returns a json that's contains an extract which is a summary of the page html 
https://en.wiktionary.org/w/api.php?action=query&format=json&prop=extracts&titles=fine

//return json that's the full page which contains other languages, not just engish
https://en.wiktionary.org/w/api.php?action=parse&page=Venice&prop=text&formatversion=2&format=json

// an actual api that returns a json with normal values 
https://en.wiktionary.org/api/rest_v1/page/definition/fine


// hierarchy should be like this:
// 
// host
// └── shadowRoot
//         ├── floatingBtn
//         └── popup
//             ├── search-bar
//             │   ├── input
//             │   └── smollBtn
//             └── content
//                 └── (parsed dictionary content)


next step:
v1:
1. ~~find a way to correctly show the html ~~
2. find a way to delete selected entries in the html like translation etc
ex: 
pronunciation and it's content
translation and it's content

3. ~~ find a way to scroll ~~
4. ~~find a way to make it stick (not go away) when interacting with it ~~ 
5.~~ find a way when the translation happen and the translation popup appear the 'translate' button disapear ~~
6. publish it and market it in different subreddits ([chrome-extensions](https://www.reddit.com/r/chrome_extensions/)), twitter communities, hacker news, product hunt, add0n.com/ etc 
7. ~~fix the error of it working in some page while not-working on the others ~~
8. ~~clean the code base~~
9. ~~ change the error texts to something understandable other than: undefined, translation error, etc.~~
.~~undefined arise when a selected text page doesn't exist(like venice(without a capital) doesn't exist but Venice(with a capital) does exist)~~
10.~~ fix the weird variation of size of the popup that changes between sites by making it in a fixed size~~, a problem may arise when the popup is close to the browser's border and can't take it's full size
11. ~~ fix the stuck scroll-position between different popups~~
12. fix when i want to translate a word at the edge of the website and the popup shows outside the boundry of the website
13. ~~fix when the popup & button styling change due to the overiding it with the style of the page (solved by encapsulating both elements with a shadow-dom ) ~~
14. add a way to reach the links returned by the html(ie when you search a a plural and it returns it's a plural of a singular ie when searching for republics it returns the following (plural of republic))


v2:
1. beautifing it like the english dicitionary app so that it's easy to read
2. make the theme change in accordance with the device theme
3. consider publishing the extension in chrome
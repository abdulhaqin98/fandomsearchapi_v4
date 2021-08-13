// Resources

// https://www.mediawiki.org/wiki/API:Cross-site_requests
// https://friends.fandom.com/api.php?action=parse&pageid=1627&wrapoutputclass&format=json
// https://friends.fandom.com/api.php?action=query&list=search&srsearch=abstain&format=json
// https://www.mediawiki.org/w/api.php?action=help&modules=main
// url1: https://friends.fandom.com/api.php?action=opensearch&search=joey&format=json&origin=*

// fetch(url).then(res =>
//   res.json()).then(d => {
//     console.log(d);
//   });

window.onload = function () {

  document.getElementById('btn01').addEventListener("click", fetchMovies);

  // Get the input field
  var input = document.getElementById("querykey");

  // Execute a function when the user releases a key on the keyboard
  input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("btn01").click();
    }
  });
}

const url = ['https://friends.fandom.com/',
  'https://how-i-met-your-mother.fandom.com/',
  'https://theoffice.fandom.com/',
  'https://bigbangtheory.fandom.com/',
  'https://harrypotter.fandom.com/',
  'https://breakingbad.fandom.com/',
  'https://pixar.fandom.com/',
  'https://gameofthrones.fandom.com/',
  'https://lotr.fandom.com/',
  'https://godfather.fandom.com/',
  'https://pirates.fandom.com/',
  'https://bakerstreet.fandom.com/',
  'https://dragonball.fandom.com/',
  'https://thehungergames.fandom.com/',
  'https://marvelcinematicuniverse.fandom.com/',
  'https://batman.fandom.com/',
  'https://dc.fandom.com/',
  'https://dcmovies.fandom.com/',
  'https://dcextendeduniverse.fandom.com/',
  'https://twilightsaga.fandom.com/',
  'https://twoandahalfmen.fandom.com/',
  'https://suits.fandom.com/',
  'https://terminator.fandom.com/',
  'https://southpark.fandom.com/',
  'https://starwars.fandom.com/',
  'https://pokemon.fandom.com/',
  'https://bojackhorseman.fandom.com/'

];

// Update link 91 loop count

const series = ['Friends', 'H.I.M.Y.M', 'The Office (US)', 'The Big Bang Theory',
  'Harry Potter', 'Breaking Bad', 'PIXAR', 'G.O.T', 'Lord of the Rings',
  'The Godfather', 'PotC', 'Sherlock', 'Dragonball', 'The Hunger Games',
  'M.C.U', 'Batman', 'D.C. Database', 'D.C Movies', 'D.C. Extended Universe',
  'Twilight Saga', 'T.A.A.H.M', 'Suits', 'Terminator', 'South Park','Star Wars',
  'Pokemon', 'Bojack Horseman'];

var title;
var link;
var countWords = 0;
var countIgnoreWords = 0;
var html = '';
var html2 = '';
var dispHandle = 0;

var btnClickCount = 0;
var urlsArray = [];
var UDsynonymsArray = [];
var btnToggle = [];
var toastError = 0;

// Ignore Word

var ignoreWordArrayWord = [];
var ignoreWordArrayWordCount = [];

async function fetchMovies() {

  const key = document.getElementById('querykey').value;

  // Visibility Toggle
  var e = document.getElementById('result');
  e.style.display = 'block';
  dispHandle = 1;

  html = '';
  document.getElementById('result').innerHTML = null;

  for (i = 0; i < 27; i++) {

    const response = await fetch(url[i] + 'api.php?action=opensearch&search=' + key + '&format=json&origin=*').then(res =>
      res.json()).then(d => {
        console.log(d);

        title = d[1];
        link = d[3];
      });

    console.log(title);
    console.log(link);
    // console.log(len);

    len = title.length;

    // len == 0 ? alert(series[i] + ' no data'): null;

    html += `<p class="text-white">${series[i]}</p>`;
    for (j = 0; j < len; j++) {
      // console.log(title[j] + link[j]);

      // Regex the link
      // Fetch the title
      // Call the new API with title and fetch the html
      // search HTML for the word and count it
      // display the count next to the result in UI

      var input = link[j];
      var wiki = input.split('wiki/');

      // console.log(wiki + 'line 89');

      // always find ways to add 'await'. #life Tip#

      await fetch(wiki[0] + 'api.php?action=query&prop=revisions&titles=' + wiki[1] + '&rvprop=content&format=json&origin=*')
        .then(response => response.text())
        .then((data) => {

          // WebPage Content
          console.log('Webpage content - line 130');
          console.log(data);

          lowCaseData = data.toLowerCase();

          // var count = (lowCaseData.match(/apothecary/g) || []).length;

          // var word = 'acrimony';
          var word = document.getElementById('querykey').value.toLowerCase();
          var reGex = new RegExp(word, 'g');
          var count = (lowCaseData.match(reGex) || []).length;

          // // // IGNORE FILTER implementation // // //

          // var ignoreWord = 'dolorous edd'; // fetch from input field

          // WRONG : 'the hound, arya stark' or 'dolorous umbridge, the hound'
          // CORRECT :  'the hound,arya stark'

          // var ignoreWordList = 'the hound,arya stark';
          var ignoreWordList = document.getElementById('ignorewordlist').value.toLowerCase();
          var ignoreWordArray = ignoreWordList.split(','); //(2) ["the hound", "arya stark"]

          // console.log('array 152');
          // console.log(ignoreWordArray);

          // var ignoreWordReGex = new RegExp(ignoreWord, 'g');

          if (ignoreWordList.length > 1) {

            for (var x in ignoreWordArray) {
              var ignoreWordReGex = new RegExp(ignoreWordArray[x], 'g');
              var ignoreWordCount = (lowCaseData.match(ignoreWordReGex) || []).length;

              if (ignoreWordCount > 0) {
                // alert(ignoreWordArray[x]);
                // alert(ignoreWordCount);

                ignoreWordArrayWord.push(ignoreWordArray[x]);
                ignoreWordArrayWordCount.push(ignoreWordCount);

              }
              console.log('link 175');
              // console.log(ignoreWordArrayWord);
              // console.log(ignoreWordArrayWordCount);
            }

            console.log(ignoreWordArrayWord);
            console.log(ignoreWordArrayWordCount);
            console.log(ignoreWordCount + 'ignore words - line 149');
          }

          // // // 

          console.log(count);
          countWords = count;
        });

      // end of the new feature

      // if-else experimental, previously the inner-if statement was present directly.

      if (countWords > 0) {

        html += `
        <div class="card my-2 py-0" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="top"
          ${"title='" +
          ignoreWordArrayWord.map((item, index) => {
            return "<b>" + item + "</b>" + " " + "(" + ignoreWordArrayWordCount[index] + ")" + "<br>"
          }).join("")
          + "'"
          }
        >
          <div class="card-body d-flex justify-content-between py-1">
              <h6 class="card-title my-auto col-md-6">${title[j]}</h6>
              <div class="col-md-2"></div>
              <h6 class="card-title my-auto col-md-2">${'~(' + countWords + ')'}</h6>
              <a href="${link[j]}" target="_blank" class="btn btn-primary p-2  col-md-1">Link</a>
              <button id=${link[j]} onclick='consoPut(this);' class="btn btn-primary mx-1 col-md-1">+</button>
            </div>
          </div>`;
      }

      else {
        html += '';
      }

      ignoreWordArrayWord.length = 0;
      ignoreWordArrayWordCount.length = 0;

    } // end of for loop

    document.getElementById('result').innerHTML += html;

    html = '';
    title = '';
    link = '';

  } // end of for loop

  //toast
  toastCall();
  callToolTip();

}

function toastCall() {

  if (toastError == 1) {
    document.getElementById('toastContent').innerHTML = 'Operation Failed!';
    toastError = 0;
  }
  else {
    document.getElementById('toastContent').innerHTML = 'Operation Success!';
  }

  var options = {
    animation: true,
    delay: 2000
  };

  var ToastHTML = document.getElementById('liveToast');
  var ToastEle = new bootstrap.Toast(ToastHTML, options);

  ToastEle.show();

}

async function consoPut(e) {
  console.log(btnClickCount);
  console.log(e.id);

  urlsArray.push(e.id);
  btnClickCount++;

  document.getElementById(e.id).disabled = true;

  // Pushing Disabled Buttons to Array

  var bt = e.id;
  btnToggle.push(bt);


  if (btnClickCount == 1) {
    document.getElementById('btn02').disabled = false;
    // 'Force Update' is used if there are less than 3 options to select from list
    // take the array and push it to firebase

  }

  // Firebase Update

  if (btnClickCount == 3) {

    var searchInput = document.getElementById("querykey").value;
    var udSynonym = document.getElementById("synonyms").value;
    var altWord = document.getElementById("saveasword").value;
    // var altWord = document.getElementById("saveasword").value.length;
    btnClickCount = 0;

    // console.log(altWord.length);

    if (altWord.length > 1) {
      [searchInput, altWord] = [altWord, searchInput];
    }

    await firebase.database().ref('words/' + searchInput).set({
      urlsArray,
      udSynonym,
      altWord
    }).catch(err => {
      console.log(err);
      toastError = 1;
    });

    btnClickCount = 0;
    urlsArray.length = 0;
    document.getElementById("synonyms").value = '';
    document.getElementById("saveasword").value = '';
    toastCall();
    releaseButtons();
  }
}

async function forceUpdate() {
  var searchInput = document.getElementById("querykey").value;
  var udSynonym = document.getElementById("synonyms").value;
  var altWord = document.getElementById("saveasword").value;
  // var altWord = document.getElementById("saveasword").value.length;
  btnClickCount = 0;

  // console.log(altWord.length);

  if (altWord.length > 1) {
    [searchInput, altWord] = [altWord, searchInput];
  }

  // Experimental

  console.log(searchInput);
  console.log(altWord);


  if (urlsArray.length != 0) {
    await firebase.database().ref('words/' + searchInput).set({
      urlsArray,
      udSynonym,
      altWord
    }).catch(err => {
      console.log(err);
      toastError = 1;
    });

    btnClickCount = 0;
    urlsArray.length = 0;
    document.getElementById("synonyms").value = '';
    document.getElementById("saveasword").value = '';
    toastCall();
    releaseButtons();
  }

  else {
    toastError = 1;
    toastCall();
  }
}

function releaseButtons() {

  for (i = 0; i < btnToggle.length; i++) {
    var bt = btnToggle[i];
    document.getElementById(bt).disabled = false;

  }

  btnToggle.length = 0;

}

function showhideToggle() {
  // var e = document.getElementById(id);
  // e.style.display = (e.style.display == 'block') ? 'none' : 'block';

  var e = document.getElementById('result');
  var e2 = document.getElementById('DBresult');


  if (dispHandle == 1) {

    e.style.display = 'block';
    e2.style.display = 'none';
    dispHandle = 0;

  }

  e.style.display = (e.style.display == 'block') ? 'none' : 'block';
  e2.style.display = (e2.style.display == 'none') ? 'block' : 'none';
}

async function loadDB() {

  document.getElementById('DBresult').innerHTML = '';

  // Visibility Toggle
  var e = document.getElementById('DBresult');
  e.style.display = 'block';
  dispHandle = 1;

  var loadURL = 'https://mag1000gre-default-rtdb.europe-west1.firebasedatabase.app/words.json';

  await fetch(loadURL).then(res =>
    res.json()).then(data => {
      console.log(data);

      // for (var prop in data) {
      //   alert("Key:" + prop);
      //   alert("Value:" + data[prop]);
      // }
      var word = [];
      var wordData = [];
      var wordSynonym = [];
      var wCount = 0;

      var wordAlt;
      var wordAltHtml;
      for (var prop in data) {

        // console.log(data[prop].urlsArray);

        word.push(prop); //prop -> word
        wordData = data[prop].urlsArray; // urls associated with the word.
        wordSynonym = data[prop].udSynonym;
        wordAlt = data[prop].altWord;
        wCount++;

        // console.log(wordSynonym);

        // console.log(typeof wordAlt);

        // if(typeof wordAlt === 'string') {
        //   console.log(wordAlt);
        //   wordAltHtml = 
        // }

        //array.forEach(item => console.log(item));
        // <div class="card-body d-flex justify-content-between py-1"></div>

        html2 += `
        <div class="card my-2 py-0">
          <div class="card-body d-flex py-1">
          <h6 class="card-title my-auto col-md-1">${wCount}</h6>
              <h6 class="card-title my-auto col-md-3">${typeof wordAlt === 'string' && wordAlt.length > 1 ? prop + ' (' + wordAlt + ')' : prop
          }</h6>
              <div class="col-md-4 my-auto">
              ${wordSynonym ? wordSynonym : ``
          }
              </div>
              ${wordData.map(item => {
            return "<a href='" + item + "' target='_blank' class='btn btn-primary px-3 col-md-1 mx-1'>Link</a>"
          }).join("")
          }
              </div>
            </div>
          </div>`;

      }
      // console.log(word);
      // console.log(wordData[0]);

    });

  document.getElementById('DBresult').innerHTML += html2;
  html2 = null;
  toastCall();
}

function callToolTip() {

  // It needs to be called explicitly in order html/css/tooltip-position to work.
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })
  // alert('tooltip call');
}

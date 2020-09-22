const modal = document.getElementById('share-modal');
const body = document.getElementsByTagName('body')[0];
modal.style.display = 'none';

modal.onclick = function(e) {
    e.preventDefault();
    modal.style.display = 'none';
    body.style.overflow = 'scroll';
    return false;
}


function shareModal(event,link) {
    link = window.location.origin+link;
    event.preventDefault();
    body.style.overflow = 'hidden';
    modal.style.top = window.scrollY+'px';
    modal.style.display = 'flex'; 
    const twitterShare = document.getElementById('share-tweet');
    const facebookShare = document.getElementById('share-fb');
    const copyShare = document.getElementById('share-copy');
    
    twitterShare.onclick = function(e) {
        e.stopPropagation();
        e.preventDefault();
        const twitterWindow = window.open('https://twitter.com/share?url=' + link, 'twitter-popup', 'height=350,width=600');
        if(twitterWindow.focus) { twitterWindow.focus(); }
        modal.style.display = 'none';
        body.style.overflow = 'scroll';
        return false;
    }

    facebookShare.onclick = function(e) {
        e.stopPropagation();
        e.preventDefault();
        var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + link, 'facebook-popup', 'height=350,width=600');
        if(facebookWindow.focus) { facebookWindow.focus(); }
        modal.style.display = 'none';
        body.style.overflow = 'scroll';
        return false;
    }

    copyShare.onclick = function(e) {
        e.stopPropagation();
        e.preventDefault();
        const ele = copyShare.lastChild
        ele.innerHTML = '<a>&nbsp; Copied</a>';
        let element = document.createElement('input');
        element.setAttribute('type', 'text');
        element.setAttribute('visibility', 'hidden');
        document.body.appendChild(element);
        element.value = link;
        element.select();
        element.setSelectionRange(0, element.value.length);
        document.execCommand('copy');
        document.body.removeChild(element);
        window.setTimeout(function() {ele.innerHTML = '<a>&nbsp; Copy</a>'; body.style.overflow = 'scroll'; modal.style.display = 'none';}, 1000)
        return false;
    }
}

let db, subscriberRef;

function addSubscriber(e, emailId) {
    e.preventDefault();
    const ele = document.getElementById(emailId);
    const email = ele.value;
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        if(!db && !subscriberRef) {
            firebase.initializeApp({
                apiKey: "AIzaSyBl4_gvOCDhkAbLtuZUbWWMqngFZ-owVXc",
                authDomain: "thought-train-c08b5.firebaseapp.com",
                projectId: "thought-train-c08b5"
            });
        
            db = firebase.firestore();
            subscriberRef = db.collection("thought-train").doc("subscribers");
        }
        subscriberRef.update({
            list: firebase.firestore.FieldValue.arrayUnion(email)
        }).then(() => {
            ele.value = 'Thank you :)'
            ele.style.color = '#1DB954';
            ele.blur();
        }).catch((err) => {
            ele.value = 'Oops :( Would you mind trying once more.'
            ele.style.color = '#FF0000';
            ele.blur();
        });
    } else {
        ele.value = 'Expecting a valid email :)'
        ele.style.color = '#FF0000';
        ele.blur();
    }
    return false;
}
let vd1;
let vd1Info;
//let setAxis;


var slider = document.getElementById("myRange");
var output = document.getElementById("demo");

const $start = document.getElementById('start');
const $enter = document.getElementById('enter');
const $display = document.getElementById('display');
const $keyfield = document.getElementById('keyfield');
const $tabcontent = document.getElementById('tabcontent');
const $tabs = document.getElementById('tabs');

const contentChildren = $tabcontent.children;
const tabChildren = $tabs.children;

$keyfield.style.display = 'none';
mfd.getCrypto(() => {
    const storedSalt = localStorage.getItem('mfd-salt');
    const storedIts = localStorage.getItem('mfd-its');
    if (storedSalt == mfd.crypto.salt && storedIts == mfd.crypto.iterations) {
        mfd.crypto.setKey(localStorage.getItem('mfd-key'));
        mfd.test(res => {
            if (!res.test || res.test !== 'OK') {
                $keyfield.style.display = 'inline';
                $enter.innerHTML = 'Enter Key';
            }
        })
    } else {
        $keyfield.style.display = 'inline';
        $enter.innerHTML = 'Enter Key';
    }
});


function submit () {
    if ($keyfield.style.display !== 'none') {
        mfd.crypto.generateKey($keyfield.value);

        localStorage.setItem('mfd-salt', mfd.crypto.salt);
        localStorage.setItem('mfd-its', mfd.crypto.iterations);
        mfd.test(res => {
            if (res.test && res.test === 'OK') {
                localStorage.setItem('mfd-key', mfd.crypto.key);
                login();
            }
            else {
                return;
            }
        });
    }
    else { // credentials already stored
        login();
    }
    return false; // prevent default form post action
}

function login () {
    // switching out button for the grid
    $start.style.display = 'none';
    $display.style.display = 'block';



    // animating button fade-in
    const fadeStagger = 50; // in ms
	for (let i=0; i < tabChildren.length; i++) {
		setTimeout(() => tabChildren[i].style.opacity = 1, i*fadeStagger);
    }

    // enabling NoSleep if it exists
    if (NoSleep) {
        let nosleep = new NoSleep();
        nosleep.enable();
    }

    setTab('tab1');
    initVJoy();

}

navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
function vib () {
    if (navigator.vibrate) navigator.vibrate(50);
}

function setTab(tabName) {
    for (let t = 0; t < tabChildren.length; t++) {
        const tab = tabChildren[t];
        if (tab.id === tabName) tab.className = 'activeTab';
        else tab.className = 'inactiveTab';
    }

    const fadeStagger = 32;

    const displayName = tabName + '_display';
    for (let c = 0; c < contentChildren.length; c++) {
        const disp = contentChildren[c];
        const dispButtons = disp.children;
        if (disp.id === displayName) {
            disp.style.display = 'grid';
            for (let d = 0; d < dispButtons.length; d++) {
                setTimeout(() => dispButtons[d].style.opacity = 1, d*fadeStagger)
            }
        }
        else {
            disp.style.display = 'none';
            for (let d = 0; d < dispButtons.length; d++) {
                dispButtons[d].style.opacity = 0;
            }
        }
    }
}

function initVJoy(){
	mfd.vJoy.info(vji => {
		// simple error checks

		if (!vji.enabled) return console.error('vJoy not enabled test');
		if (vji.existingDevices < 1) return console.error('No vJoy virtual devices found');


		vd1 = mfd.vJoy.device(2);

		vd1.info(x => {
			// acquiring the device
			if (x.status === "VJD_STAT_FREE") {
			        console.log('Stats!');
				    vd1.acquire();
			}
			// setting vdInfo for use by the event handlersbtn
			// uncomment for testing:
			console.log('vJoy detected!');
			console.log(vd1.Info);

		});
	});
}

$('.starpit').click(function() {
    $(this).toggleClass('active');
});

$('.starpitRedToggle').click(function() {
    $(this).toggleClass('active');
});

$('.starpit-Long').click(function() {
    $(this).toggleClass('active');
});

$('.starpitLeftCurve').click(function() {
    $(this).toggleClass('active');
});

function fireBtn(btn) {
    vd1.setBtn(btn, true);
	mfd.wait(50);
	vd1.setBtn(btn, false);}

// Funtions for toggle vJoy input

var wpngroup1 = false;

function wpnGrp1Safe(btn) {
  if (wpngroup1 == false) {
      vd1.setBtn(btn, true);
      wpngroup1 = true;
  }else {
      vd1.setBtn(btn, false);
      wpngroup1 = false;
  }
}

var wpngroup2 = false;

function wpnGrp2Safe(btn) {
  if (wpngroup2 == false) {
      vd1.setBtn(btn, true);
      wpngroup2 = true;
  }else {
      vd1.setBtn(btn, false);
      wpngroup2 = false;
  }
}

var CMSpread = false;

function CMSpreadToggle(btn) {
  if (CMSpread == false) {
      vd1.setBtn(btn, true);
      CMSpread = true;
  }else {
      vd1.setBtn(btn, false);
      CMSpread = false;
  }
}


var rangeSlider = document.getElementById("rs-range-line");
var rangeBullet = document.getElementById("rs-bullet");

rangeSlider.addEventListener("input", showSliderValue, false);

function showSliderValue() {
  rangeBullet.innerHTML = rangeSlider.value;
  var bulletPosition = (rangeSlider.value /rangeSlider.max);
  rangeBullet.style.left = (bulletPosition * 578) + "px";
  zAxis(rangeSlider.value);
}


function zAxis(val) {
  output = val * 327.68
	mfd.vJoy.device(2).setAxis("z", output);
}

var bar = new ldBar(
  node-selector, /* Element or Selector for target element */
  options /* check Reference for supported options */
);

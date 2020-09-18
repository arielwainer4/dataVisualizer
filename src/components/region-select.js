import React from 'react'

const RegionSelect = (props) => {
  const states = [
{  us: "U.S."},
{  ak: "AK"},
{  al: "AL"},
{  ar: "AR"},
{  az: "AZ"},
{  ca: "CA"},
{  co: "CO"},
{  ct: "CT"},
{  dc: "DC"},
{  de: "DE"},
{  fl: "FL"},
{  ga: "GA"},
{  hi: "HI"},
{  ia: "IA"},
{  id: "ID"},
{  il: "IL"},
{  in: "IN"},
{  ks: "KS"},
{  ky: "KY"},
{  la: "LA"},
{  ma: "MA"},
{  md: "MD"},
{  me: "ME"},
{  mi: "MI"},
{  mn: "MN"},
{  mo: "MO"},
{  ms: "MS"},
{  mt: "MT"},
{  nc: "NC"},
{  nd: "ND"},
{  ne: "NE"},
{  nh: "NH"},
{  nj: "NJ"},
{  nm: "NM"},
{  nv: "NV"},
{  ny: "NY"},
{  oh: "OH"},
{  ok: "OK"},
{  or: "OR"},
{  pa: "PA"},
{  ri: "RI"},
{  sc: "SC"},
{  sd: "SD"},
{  tn: "TN"},
{  tx: "TX"},
{  ut: "UT"},
{  va: "VA"},
{  vt: "VT"},
{  wa: "WA"},
{  wi: "WI"},
{  wv: "WV"},
{  wy: "WY"} ]

  return (
    <div>
      <select onChange={props.regionSelector}>
      <option defaultValue="none" >Choose a Region</option>
        {states.map((state, idx) => {
          let lower;
          let upper;
          for(let object in state) {
            lower = object
            upper = state[object]
          }
            return <option value={lower} key={idx}>{upper}</option>
        })
      }
    </select>
  </div>
  )
}

export default RegionSelect

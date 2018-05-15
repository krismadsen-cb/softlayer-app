const Sort = {
  'by': {
    'ip': (a, b) => {
      let aa = a.split('.');
      let ab = b.split('.');
      let asa = a.split(':');
      let asb = b.split(':');
      if (aa.length > 1 && ab.length > 1) {
        for(let i in aa) {
          if(aa[i] === ab[i]) {
            continue;
          } else {
            return parseInt(aa[i], 10) > parseInt(ab[i], 10) ? 1 : -1;
          }
        }
      } else if(asa.length > 0 && asb.length > 0) {
        for(let i in asa){
          if(asa[i] === asb[i]) {
            continue;
          } else {
            return parseInt(asa[i], 16) > parseInt(asb[i], 16) ? 1 : -1;
          }
        }
      } else if(aa.length > 1 && ab.length === 1) {
        return 1;
      } else if(aa.length === 1 && ab.length > 1) {
        return -1;
      }
    }
  }
}

export default Sort;

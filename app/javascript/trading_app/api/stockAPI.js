import axios from 'axios'
// import { v4 } from 'node-uuid'
import handleAxiosError from 'trading_app/lib/utils/handleAxiosError'

const stockDatabase = [
  {"company":"제일약품","symbol":271980},
  {"company":"카카오","symbol":35720},
  {"company":"오리온","symbol":271560},
  {"company":"미원에스씨","symbol":268280},
  {"company":"경동도시가스","symbol":267290},
  {"company":"넷마블게임즈","symbol":251270},
  {"company":"아이엔지생명","symbol":79440},
  {"company":"현대건설기계","symbol":267270},
  {"company":"현대로보틱스","symbol":267250},
  {"company":"현대일렉트릭","symbol":267260},
  {"company":"크라운제과","symbol":264900},
  {"company":"덴티움","symbol":145720},
  {"company":"호전실업","symbol":111110},
  {"company":"핸즈코퍼레이션","symbol":143210},
  {"company":"두산밥캣","symbol":241560},
  {"company":"삼성바이오로직스","symbol":207940},
  {"company":"JW생명과학","symbol":234080},
  {"company":"화승엔터프라이즈","symbol":241590},
  {"company":"LS전선아시아","symbol":229640},
  {"company":"모두투어리츠","symbol":204210},
  {"company":"일동제약","symbol":249420},
  {"company":"샘표식품","symbol":248170},
  {"company":"두올","symbol":16740},
  {"company":"동서","symbol":26960},
  {"company":"한국자산신탁","symbol":123890},
  {"company":"한국토지신탁","symbol":34830},
  {"company":"해성디에스","symbol":195870},
  {"company":"용평리조트","symbol":70960},
  {"company":"해태제과식품","symbol":101530},
  {"company":"대림씨엔에스","symbol":4440},
  {"company":"제이에스코퍼레이션","symbol":194370},
  {"company":"코리아오토글라스","symbol":152330},
  {"company":"잇츠한불","symbol":226320},
  {"company":"세진중공업","symbol":75580},
  {"company":"금호에이치티","symbol":214330},
  {"company":"제주항공","symbol":89590},
  {"company":"현대코퍼레이션홀딩스","symbol":227840},
  {"company":"LIG넥스원","symbol":79550},
  {"company":"동일제강","symbol":2690},
  {"company":"아이콘트롤스","symbol":39570},
  {"company":"AJ네트웍스","symbol":95570},
  {"company":"이노션","symbol":214320},
  {"company":"토니모리","symbol":214420},
  {"company":"미래에셋생명","symbol":85620},
  {"company":"경보제약","symbol":214390},
  {"company":"SK디앤디","symbol":210980},
  {"company":"엔에스쇼핑","symbol":138250},
  {"company":"세화아이엠씨","symbol":145210},
  {"company":"한솔제지","symbol":213500},
  {"company":"디와이파워","symbol":210540},
  {"company":"삼성물산","symbol":28260},
  {"company":"씨에스윈드","symbol":112610},
  {"company":"우리은행","symbol":30},
  {"company":"삼성에스디에스","symbol":18260},
  {"company":"만도","symbol":204320},
  {"company":"서연이화","symbol":200880},
  {"company":"쿠쿠전자","symbol":192400},
  {"company":"화인베스틸","symbol":133820},
  {"company":"광주은행","symbol":192530},
  {"company":"BGF리테일","symbol":27410},
  {"company":"코스맥스","symbol":192820},
  {"company":"종근당","symbol":185750},
  {"company":"신송홀딩스","symbol":6880},
  {"company":"아세아시멘트","symbol":183190},
  {"company":"현대로템","symbol":64350},
  {"company":"한진칼","symbol":180640},
  {"company":"NHN엔터테인먼트","symbol":181710},
  {"company":"JB금융지주","symbol":175330},
  {"company":"하이골드12호","symbol":172580},
  {"company":"DSR","symbol":155660},
  {"company":"한국패러랠","symbol":168490},
  {"company":"동아에스티","symbol":170900},
  {"company":"지엠비코리아","symbol":13870},
  {"company":"CJ헬로비전","symbol":37560},
  {"company":"동일고무벨트","symbol":163560},
  {"company":"한국콜마","symbol":161890},
  {"company":"한국타이어","symbol":161390},
  {"company":"애경유화","symbol":161000},
  {"company":"하이골드8호","symbol":159650},
  {"company":"AJ렌터카","symbol":68400},
  {"company":"바다로19호","symbol":155900},
  {"company":"사조씨푸드","symbol":14710},
  {"company":"하이골드3호","symbol":153360},
  {"company":"코오롱머티리얼","symbol":144620},
  {"company":"한국ANKOR유전","symbol":152550},
  {"company":"휴비스","symbol":79980},
  {"company":"케이탑리츠","symbol":145270},
  {"company":"GS리테일","symbol":7070},
  {"company":"인터지스","symbol":129260},
  {"company":"삼양사","symbol":145990},
  {"company":"하나투어","symbol":39130},
  {"company":"트러스제7호","symbol":140890},
  {"company":"에이블씨엔씨","symbol":78520},
  {"company":"삼원강재","symbol":23000},
  {"company":"신세계인터내셔날","symbol":31430},
  {"company":"에이리츠","symbol":140910},
  {"company":"한국항공우주","symbol":47810},
  {"company":"롯데하이마트","symbol":71840},
  {"company":"엠케이트렌드","symbol":69640},
  {"company":"코오롱플라스틱","symbol":138490},
  {"company":"이마트","symbol":139480},
  {"company":"DGB금융지주","symbol":139130},
  {"company":"케이티스카이라이프","symbol":53210},
  {"company":"세아특수강","symbol":19440},
  {"company":"메리츠금융지주","symbol":138040},
  {"company":"한국종합기술","symbol":23350},
  {"company":"BNK금융지주","symbol":138930},
  {"company":"일진머티리얼즈","symbol":20150},
  {"company":"현대위아","symbol":11210},
  {"company":"선진","symbol":136490},
  {"company":"미원화학","symbol":134380},
  {"company":"팀스","symbol":134790},
  {"company":"두산엔진","symbol":82740},
  {"company":"대성에너지","symbol":117580},
  {"company":"현대에이치씨엔","symbol":126560},
  {"company":"케이티스","symbol":58860},
  {"company":"한전산업","symbol":130660},
  {"company":"코라오홀딩스","symbol":900140},
  {"company":"동양네트웍스","symbol":30790},
  {"company":"휠라코리아","symbol":81660},
  {"company":"KTcs","symbol":58850},
  {"company":"현대홈쇼핑","symbol":57050},
  {"company":"도화엔지니어링","symbol":2150},
  {"company":"대성산업","symbol":128820},
  {"company":"아이마켓코리아","symbol":122900},
  {"company":"한미약품","symbol":128940},
  {"company":"우진","symbol":105840},
  {"company":"무학","symbol":33920},
  {"company":"웅진에너지","symbol":103130},
  {"company":"이연제약","symbol":102460},
  {"company":"한국화장품","symbol":123690},
  {"company":"에스제이엠","symbol":123700},
  {"company":"한라홀딩스","symbol":60980},
  {"company":"삼성생명","symbol":32830},
  {"company":"신세계푸드","symbol":31440},
  {"company":"한화생명","symbol":88350},
  {"company":"조선선재","symbol":120030},
  {"company":"코오롱인더","symbol":120110},
  {"company":"KC코트렐","symbol":119650},
  {"company":"지역난방공사","symbol":71320},
  {"company":"락앤락","symbol":115390},
  {"company":"영흥철강","symbol":12160},
  {"company":"우리들휴브레인","symbol":118000},
  {"company":"한전기술","symbol":52690},
  {"company":"GKL","symbol":114090},
  {"company":"SK","symbol":34730},
  {"company":"황금에스티","symbol":32560},
  {"company":"하이트진로","symbol":80},
  {"company":"동양생명","symbol":82640},
  {"company":"쌍용머티리얼","symbol":47400},
  {"company":"형지엘리트","symbol":93240},
  {"company":"키움증권","symbol":39490},
  {"company":"영원무역","symbol":111770},
  {"company":"아주캐피탈","symbol":33660},
  {"company":"한미글로벌","symbol":53690},
  {"company":"동아지질","symbol":28100},
  {"company":"중국원양자원","symbol":900050},
  {"company":"STX중공업","symbol":71970},
  {"company":"LG하우시스","symbol":108670},
  {"company":"한세실업","symbol":105630},
  {"company":"KGP","symbol":109070},
  {"company":"미원홀딩스","symbol":107590},
  {"company":"NAVER","symbol":35420},
  {"company":"부국철강","symbol":26940},
  {"company":"KB금융","symbol":105560},
  {"company":"한국철강","symbol":104700},
  {"company":"일진전기","symbol":103590},
  {"company":"풍산","symbol":103140},
  {"company":"LG이노텍","symbol":11070},
  {"company":"명문제약","symbol":17180},
  {"company":"비상교육","symbol":100220},
  {"company":"동성코퍼레이션","symbol":102260},
  {"company":"쌍방울","symbol":102280},
  {"company":"LG유플러스","symbol":32640},
  {"company":"아티스","symbol":101140},
  {"company":"아시아나항공","symbol":20560},
  {"company":"SBS미디어홀딩스","symbol":101060},
  {"company":"S&TC","symbol":100840},
  {"company":"진양홀딩스","symbol":100250},
  {"company":"하나니켈1호","symbol":99340},
  {"company":"하나니켈2호","symbol":99350},
  {"company":"엔케이","symbol":85310},
  {"company":"한전KPS","symbol":51600},
  {"company":"이아이디","symbol":93230},
  {"company":"기신정기","symbol":92440},
  {"company":"KSS해운","symbol":44450},
  {"company":"효성 ITX","symbol":94280},
  {"company":"유나이티드","symbol":33270},
  {"company":"디아이씨","symbol":92200},
  {"company":"CJ제일제당","symbol":97950},
  {"company":"팬오션","symbol":28670},
  {"company":"한진중공업","symbol":97230},
  {"company":"JW홀딩스","symbol":96760},
  {"company":"SK이노베이션","symbol":96770},
  {"company":"삼성카드","symbol":29780},
  {"company":"베트남개발1","symbol":96300},
  {"company":"알루코","symbol":1780},
  {"company":"웅진씽크빅","symbol":95720},
  {"company":"맵스리얼티1","symbol":94800},
  {"company":"아비스타","symbol":90370},
  {"company":"후성","symbol":93370},
  {"company":"LF","symbol":93050},
  {"company":"주연테크","symbol":44380},
  {"company":"코스맥스비티아이","symbol":44820},
  {"company":"인천도시가스","symbol":34590},
  {"company":"삼정펄프","symbol":9770},
  {"company":"KEC","symbol":92220},
  {"company":"KPX홀딩스","symbol":92230},
  {"company":"현대EP","symbol":89470},
  {"company":"세원셀론텍","symbol":91090},
  {"company":"노루페인트","symbol":90350},
  {"company":"아모레퍼시픽","symbol":90430},
  {"company":"롯데관광개발","symbol":32350},
  {"company":"평화산업","symbol":90080},
  {"company":"우진플라임","symbol":49800},
  {"company":"신세계I&C","symbol":35510},
  {"company":"진도","symbol":88790},
  {"company":"맥쿼리인프라","symbol":88980},
  {"company":"롯데쇼핑","symbol":23530},
  {"company":"현대글로비스","symbol":86280},
  {"company":"티비에이치글로벌","symbol":84870},
  {"company":"하나금융지주","symbol":86790},
  {"company":"제일연마","symbol":1560},
  {"company":"현대리바트","symbol":79430},
  {"company":"대한제강","symbol":84010},
  {"company":"새론오토모티브","symbol":75180},
  {"company":"KPX그린케미칼","symbol":83420},
  {"company":"동북아12호선박투자","symbol":83370},
  {"company":"동북아13호선박투자","symbol":83380},
  {"company":"대상홀딩스","symbol":84690},
  {"company":"아시아퍼시픽15호","symbol":83620},
  {"company":"코아스","symbol":71950},
  {"company":"이월드","symbol":84680},
  {"company":"동양고속","symbol":84670},
  {"company":"한미반도체","symbol":42700},
  {"company":"동일산업","symbol":4890},
  {"company":"삼호개발","symbol":10960},
  {"company":"금호타이어","symbol":73240},
  {"company":"CJ CGV","symbol":79160},
  {"company":"일진다이아","symbol":81000},
  {"company":"유니드","symbol":14830},
  {"company":"상신브레이크","symbol":41650},
  {"company":"사조해표","symbol":79660},
  {"company":"인팩","symbol":23810},
  {"company":"GS","symbol":78930},
  {"company":"유니퀘스트","symbol":77500},
  {"company":"동아에스텍","symbol":58730}
]


const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const updateLogin = (url, {userName, userId, accountNo}) => {
  // console.log(url)
  const data = {
    format: 'json',
    user: {
      name: userName,
      login_id: userId,
      account_no: accountNo
    }
  }
  return axios.post(url, data)
    .then(response => response.data)
    .catch(handleAxiosError)
}

const getAllSymbols = (url) => {
  // return delay(300).then(() => {
  //   return stockDatabase.map( symbod => symbod )
  // })
  return axios.get(url)
    .then( response => response.data )
    .catch(handleAxiosError)
}

const getWatchList = (url) => {
  // console.log(url)
  return axios.get(url)
    .then( response => response.data )
    .catch(handleAxiosError)
}

const addWatchList = (url, symbol, company) => {
  // console.log(url)
  const data = {
    format: 'json',
    stock: {
      symbol: symbol,
      company: company,
    }
  }
  return axios.post(url, data)
    .then(response => response.data)
    .catch(handleAxiosError)
}

const removeWatchList = (url, symbol, company) => {
  // console.log(url)
  const options = {
    method: 'DELETE',
    params: {
      format: 'json',
      symbol: symbol,
      company: company,
    }
  }
  return axios.delete(url, options)
    .then(response => response.data)
    .catch(handleAxiosError)
}

// const toggleWatching = (url, symbol, company) => {
//   const data = {
//     format: 'json',
//     stock: {
//       symbol: symbol,
//       company: company,
//     }
//   }
//   // console.log(url)
//   return axios.post(url, data)
//     .then(response => response.data)
//     .catch(handleAxiosError)
//
// }

export { updateLogin, getAllSymbols, getWatchList, addWatchList, removeWatchList }

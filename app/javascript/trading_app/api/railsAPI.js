import axios from 'axios'
// import { v4 } from 'node-uuid'
import handleAxiosError from 'trading_app/lib/utils/handleAxiosError'

const stockDatabase = [
  {"name":"제일약품","symbol":271980},
  {"name":"카카오","symbol":35720},
  {"name":"오리온","symbol":271560},
  {"name":"미원에스씨","symbol":268280},
  {"name":"경동도시가스","symbol":267290},
  {"name":"넷마블게임즈","symbol":251270},
  {"name":"아이엔지생명","symbol":79440},
  {"name":"현대건설기계","symbol":267270},
  {"name":"현대로보틱스","symbol":267250},
  {"name":"현대일렉트릭","symbol":267260},
  {"name":"크라운제과","symbol":264900},
  {"name":"덴티움","symbol":145720},
  {"name":"호전실업","symbol":111110},
  {"name":"핸즈코퍼레이션","symbol":143210},
  {"name":"두산밥캣","symbol":241560},
  {"name":"삼성바이오로직스","symbol":207940},
  {"name":"JW생명과학","symbol":234080},
  {"name":"화승엔터프라이즈","symbol":241590},
  {"name":"LS전선아시아","symbol":229640},
  {"name":"모두투어리츠","symbol":204210},
  {"name":"일동제약","symbol":249420},
  {"name":"샘표식품","symbol":248170},
  {"name":"두올","symbol":16740},
  {"name":"동서","symbol":26960},
  {"name":"한국자산신탁","symbol":123890},
  {"name":"한국토지신탁","symbol":34830},
  {"name":"해성디에스","symbol":195870},
  {"name":"용평리조트","symbol":70960},
  {"name":"해태제과식품","symbol":101530},
  {"name":"대림씨엔에스","symbol":4440},
  {"name":"제이에스코퍼레이션","symbol":194370},
  {"name":"코리아오토글라스","symbol":152330},
  {"name":"잇츠한불","symbol":226320},
  {"name":"세진중공업","symbol":75580},
  {"name":"금호에이치티","symbol":214330},
  {"name":"제주항공","symbol":89590},
  {"name":"현대코퍼레이션홀딩스","symbol":227840},
  {"name":"LIG넥스원","symbol":79550},
  {"name":"동일제강","symbol":2690},
  {"name":"아이콘트롤스","symbol":39570},
  {"name":"AJ네트웍스","symbol":95570},
  {"name":"이노션","symbol":214320},
  {"name":"토니모리","symbol":214420},
  {"name":"미래에셋생명","symbol":85620},
  {"name":"경보제약","symbol":214390},
  {"name":"SK디앤디","symbol":210980},
  {"name":"엔에스쇼핑","symbol":138250},
  {"name":"세화아이엠씨","symbol":145210},
  {"name":"한솔제지","symbol":213500},
  {"name":"디와이파워","symbol":210540},
  {"name":"삼성물산","symbol":28260},
  {"name":"씨에스윈드","symbol":112610},
  {"name":"우리은행","symbol":30},
  {"name":"삼성에스디에스","symbol":18260},
  {"name":"만도","symbol":204320},
  {"name":"서연이화","symbol":200880},
  {"name":"쿠쿠전자","symbol":192400},
  {"name":"화인베스틸","symbol":133820},
  {"name":"광주은행","symbol":192530},
  {"name":"BGF리테일","symbol":27410},
  {"name":"코스맥스","symbol":192820},
  {"name":"종근당","symbol":185750},
  {"name":"신송홀딩스","symbol":6880},
  {"name":"아세아시멘트","symbol":183190},
  {"name":"현대로템","symbol":64350},
  {"name":"한진칼","symbol":180640},
  {"name":"NHN엔터테인먼트","symbol":181710},
  {"name":"JB금융지주","symbol":175330},
  {"name":"하이골드12호","symbol":172580},
  {"name":"DSR","symbol":155660},
  {"name":"한국패러랠","symbol":168490},
  {"name":"동아에스티","symbol":170900},
  {"name":"지엠비코리아","symbol":13870},
  {"name":"CJ헬로비전","symbol":37560},
  {"name":"동일고무벨트","symbol":163560},
  {"name":"한국콜마","symbol":161890},
  {"name":"한국타이어","symbol":161390},
  {"name":"애경유화","symbol":161000},
  {"name":"하이골드8호","symbol":159650},
  {"name":"AJ렌터카","symbol":68400},
  {"name":"바다로19호","symbol":155900},
  {"name":"사조씨푸드","symbol":14710},
  {"name":"하이골드3호","symbol":153360},
  {"name":"코오롱머티리얼","symbol":144620},
  {"name":"한국ANKOR유전","symbol":152550},
  {"name":"휴비스","symbol":79980},
  {"name":"케이탑리츠","symbol":145270},
  {"name":"GS리테일","symbol":7070},
  {"name":"인터지스","symbol":129260},
  {"name":"삼양사","symbol":145990},
  {"name":"하나투어","symbol":39130},
  {"name":"트러스제7호","symbol":140890},
  {"name":"에이블씨엔씨","symbol":78520},
  {"name":"삼원강재","symbol":23000},
  {"name":"신세계인터내셔날","symbol":31430},
  {"name":"에이리츠","symbol":140910},
  {"name":"한국항공우주","symbol":47810},
  {"name":"롯데하이마트","symbol":71840},
  {"name":"엠케이트렌드","symbol":69640},
  {"name":"코오롱플라스틱","symbol":138490},
  {"name":"이마트","symbol":139480},
  {"name":"DGB금융지주","symbol":139130},
  {"name":"케이티스카이라이프","symbol":53210},
  {"name":"세아특수강","symbol":19440},
  {"name":"메리츠금융지주","symbol":138040},
  {"name":"한국종합기술","symbol":23350},
  {"name":"BNK금융지주","symbol":138930},
  {"name":"일진머티리얼즈","symbol":20150},
  {"name":"현대위아","symbol":11210},
  {"name":"선진","symbol":136490},
  {"name":"미원화학","symbol":134380},
  {"name":"팀스","symbol":134790},
  {"name":"두산엔진","symbol":82740},
  {"name":"대성에너지","symbol":117580},
  {"name":"현대에이치씨엔","symbol":126560},
  {"name":"케이티스","symbol":58860},
  {"name":"한전산업","symbol":130660},
  {"name":"코라오홀딩스","symbol":900140},
  {"name":"동양네트웍스","symbol":30790},
  {"name":"휠라코리아","symbol":81660},
  {"name":"KTcs","symbol":58850},
  {"name":"현대홈쇼핑","symbol":57050},
  {"name":"도화엔지니어링","symbol":2150},
  {"name":"대성산업","symbol":128820},
  {"name":"아이마켓코리아","symbol":122900},
  {"name":"한미약품","symbol":128940},
  {"name":"우진","symbol":105840},
  {"name":"무학","symbol":33920},
  {"name":"웅진에너지","symbol":103130},
  {"name":"이연제약","symbol":102460},
  {"name":"한국화장품","symbol":123690},
  {"name":"에스제이엠","symbol":123700},
  {"name":"한라홀딩스","symbol":60980},
  {"name":"삼성생명","symbol":32830},
  {"name":"신세계푸드","symbol":31440},
  {"name":"한화생명","symbol":88350},
  {"name":"조선선재","symbol":120030},
  {"name":"코오롱인더","symbol":120110},
  {"name":"KC코트렐","symbol":119650},
  {"name":"지역난방공사","symbol":71320},
  {"name":"락앤락","symbol":115390},
  {"name":"영흥철강","symbol":12160},
  {"name":"우리들휴브레인","symbol":118000},
  {"name":"한전기술","symbol":52690},
  {"name":"GKL","symbol":114090},
  {"name":"SK","symbol":34730},
  {"name":"황금에스티","symbol":32560},
  {"name":"하이트진로","symbol":80},
  {"name":"동양생명","symbol":82640},
  {"name":"쌍용머티리얼","symbol":47400},
  {"name":"형지엘리트","symbol":93240},
  {"name":"키움증권","symbol":39490},
  {"name":"영원무역","symbol":111770},
  {"name":"아주캐피탈","symbol":33660},
  {"name":"한미글로벌","symbol":53690},
  {"name":"동아지질","symbol":28100},
  {"name":"중국원양자원","symbol":900050},
  {"name":"STX중공업","symbol":71970},
  {"name":"LG하우시스","symbol":108670},
  {"name":"한세실업","symbol":105630},
  {"name":"KGP","symbol":109070},
  {"name":"미원홀딩스","symbol":107590},
  {"name":"NAVER","symbol":35420},
  {"name":"부국철강","symbol":26940},
  {"name":"KB금융","symbol":105560},
  {"name":"한국철강","symbol":104700},
  {"name":"일진전기","symbol":103590},
  {"name":"풍산","symbol":103140},
  {"name":"LG이노텍","symbol":11070},
  {"name":"명문제약","symbol":17180},
  {"name":"비상교육","symbol":100220},
  {"name":"동성코퍼레이션","symbol":102260},
  {"name":"쌍방울","symbol":102280},
  {"name":"LG유플러스","symbol":32640},
  {"name":"아티스","symbol":101140},
  {"name":"아시아나항공","symbol":20560},
  {"name":"SBS미디어홀딩스","symbol":101060},
  {"name":"S&TC","symbol":100840},
  {"name":"진양홀딩스","symbol":100250},
  {"name":"하나니켈1호","symbol":99340},
  {"name":"하나니켈2호","symbol":99350},
  {"name":"엔케이","symbol":85310},
  {"name":"한전KPS","symbol":51600},
  {"name":"이아이디","symbol":93230},
  {"name":"기신정기","symbol":92440},
  {"name":"KSS해운","symbol":44450},
  {"name":"효성 ITX","symbol":94280},
  {"name":"유나이티드","symbol":33270},
  {"name":"디아이씨","symbol":92200},
  {"name":"CJ제일제당","symbol":97950},
  {"name":"팬오션","symbol":28670},
  {"name":"한진중공업","symbol":97230},
  {"name":"JW홀딩스","symbol":96760},
  {"name":"SK이노베이션","symbol":96770},
  {"name":"삼성카드","symbol":29780},
  {"name":"베트남개발1","symbol":96300},
  {"name":"알루코","symbol":1780},
  {"name":"웅진씽크빅","symbol":95720},
  {"name":"맵스리얼티1","symbol":94800},
  {"name":"아비스타","symbol":90370},
  {"name":"후성","symbol":93370},
  {"name":"LF","symbol":93050},
  {"name":"주연테크","symbol":44380},
  {"name":"코스맥스비티아이","symbol":44820},
  {"name":"인천도시가스","symbol":34590},
  {"name":"삼정펄프","symbol":9770},
  {"name":"KEC","symbol":92220},
  {"name":"KPX홀딩스","symbol":92230},
  {"name":"현대EP","symbol":89470},
  {"name":"세원셀론텍","symbol":91090},
  {"name":"노루페인트","symbol":90350},
  {"name":"아모레퍼시픽","symbol":90430},
  {"name":"롯데관광개발","symbol":32350},
  {"name":"평화산업","symbol":90080},
  {"name":"우진플라임","symbol":49800},
  {"name":"신세계I&C","symbol":35510},
  {"name":"진도","symbol":88790},
  {"name":"맥쿼리인프라","symbol":88980},
  {"name":"롯데쇼핑","symbol":23530},
  {"name":"현대글로비스","symbol":86280},
  {"name":"티비에이치글로벌","symbol":84870},
  {"name":"하나금융지주","symbol":86790},
  {"name":"제일연마","symbol":1560},
  {"name":"현대리바트","symbol":79430},
  {"name":"대한제강","symbol":84010},
  {"name":"새론오토모티브","symbol":75180},
  {"name":"KPX그린케미칼","symbol":83420},
  {"name":"동북아12호선박투자","symbol":83370},
  {"name":"동북아13호선박투자","symbol":83380},
  {"name":"대상홀딩스","symbol":84690},
  {"name":"아시아퍼시픽15호","symbol":83620},
  {"name":"코아스","symbol":71950},
  {"name":"이월드","symbol":84680},
  {"name":"동양고속","symbol":84670},
  {"name":"한미반도체","symbol":42700},
  {"name":"동일산업","symbol":4890},
  {"name":"삼호개발","symbol":10960},
  {"name":"금호타이어","symbol":73240},
  {"name":"CJ CGV","symbol":79160},
  {"name":"일진다이아","symbol":81000},
  {"name":"유니드","symbol":14830},
  {"name":"상신브레이크","symbol":41650},
  {"name":"사조해표","symbol":79660},
  {"name":"인팩","symbol":23810},
  {"name":"GS","symbol":78930},
  {"name":"유니퀘스트","symbol":77500},
  {"name":"동아에스텍","symbol":58730}
]


const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const updateLogin = (serverAddress, {userName, userId, accountNo}) => {
  const url = `http://${serverAddress}/api/v1/users`
  // console.log(url)

  const data = {
    format: 'json',
    user: {
      name: userName,
      login: userId,
      account: accountNo
    }
  }
  return axios.post(url, data)
    .then(response => response.data)
    .catch(handleAxiosError)
}

const getAllSymbols = (serverAddress, accountNo) => {
  const url = `http://${serverAddress}/api/v1/symbols/${accountNo}`
  // console.log(url)

  // return delay(300).then(() => {
  //   return stockDatabase.map( symbod => symbod )
  // })

  return axios.get(url)
    .then( response => response.data )
    .catch(handleAxiosError)
}

const getWatchList = (serverAddress, accountNo) => {
  const url = `http://${serverAddress}/api/v1/watchlist/${accountNo}`
  // console.log(url)

  return axios.get(url)
    .then( response => response.data )
    .catch(handleAxiosError)
}

const addWatchList = (serverAddress, accountNo, symbol, name) => {
  const url = `http://${serverAddress}/api/v1/watchlist/${accountNo}`
  console.log(url)

  const data = {
    format: 'json',
    stock: {
      symbol: symbol,
      name: name,
    }
  }
  return axios.post(url, data)
    .then(response => response.data)
    .catch(handleAxiosError)
}

const removeWatchList = (serverAddress, accountNo, symbol, name) => {
  const url = `http://${serverAddress}/api/v1/watchlist/${accountNo}`
  // console.log(url)

  const options = {
    method: 'DELETE',
    params: {
      format: 'json',
      symbol: symbol,
      name: name,
    }
  }
  return axios.delete(url, options)
    .then(response => response.data)
    .catch(handleAxiosError)
}

// const toggleWatching = (url, symbol, name) => {
//   const data = {
//     format: 'json',
//     stock: {
//       symbol: symbol,
//       name: name,
//     }
//   }
//   // console.log(url)
//   return axios.post(url, data)
//     .then(response => response.data)
//     .catch(handleAxiosError)
//
// }

export { updateLogin, getAllSymbols, getWatchList, addWatchList, removeWatchList }

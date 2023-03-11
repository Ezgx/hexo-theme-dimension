/**
 * card
 * {% card name,url,bg,star,text,icon,tag,w,h %}
 * {% card 标题,链接,背景,评分,评价,图标,标签,宽度,高度 %}
 */

'use strict'

// 分数转成星星
function tostar(num) {
    let tmp = ''
    for (let i = 0; i < Math.floor(num); i++) { tmp += '<i class="fa-solid fa-star"></i>' } // 整数部分加实心星星
    if (num - Math.floor(num) != 0) tmp += '<i class="fa-solid fa-star-half-alt"></i>' // 小数部分转成半星
    for (let i = 0; i < 5 - Math.ceil(num); i++) { tmp += '<i class="fa-regular fa-star"></i>' } // 不够5个补空心星星
    return tmp
}

function card(args) {
    args = args.join(' ').split(',')

    // 获取参数
    let name = (args[0] || '未知').trim()
    let url = (args[1] || '').trim()
    let bg = (args[2] ? `background-image: url(${args[2]});` : 'background-color: #333;').trim()
    let star = tostar(Number(args[3]) || 0)
    let text = (args[4] || '此作品博主暂未作出评价').trim()
    let icon = (args[5] || '').trim()
    let tag = (args[6] || '').trim()
    let w = args[7] || '200px'
    let h = args[8] || '275px'

    return `<div title="${name}" referrerPolicy="no-referrer" class="card_box" style="${bg} width:${w}; height:${h};">
    <div class="card_mask">
      <span>${text}</span>
      ${url?'<a href="'+url+'">查看详情</a>':''}
    </div>
    <div class="card_top">
      <i class="${icon}"></i>
      <span>${tag}</span>
    </div>
    <div class="card_content">
      <span>${name}</span>
      <div>${star}</div>
    </div>
  </div>`
}

hexo.extend.tag.register('card', card, { ends: false })
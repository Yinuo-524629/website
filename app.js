const projects = [
  { id: 'editorial', company: '上海教育出版社', englishCompany: 'Shanghai Educational Publishing House',
    zh: { role: '助理编辑', date: '2026年8月—2026年9月', points: [
      ['资料检索', '为《环球教育时讯》开展教育人物及专题研究资料搜集，利用 AI 辅助检索相关论文，逐一核验原始网页及文献来源。'],
      ['稿件撰写', '独立撰写1篇一丹奖获奖者保罗·格莱维（Paul W. Glewwe）人物稿，根据编辑反馈整合其教育研究成果、梳理叙事主线并调整文章结构。'],
      ['文字校对', '完成20余篇教育稿件的文字校对与语言规范检查。'],
      ['视觉素材策划与筛选', '负责10篇教育专题文章的配图素材整理，根据文章主题提炼检索关键词，通过视觉中国、拍信、Freepik等平台筛选约30张图片素材，兼顾内容契合度与授权要求，支持专题内容的图文呈现。'] ] },
    en: { role: 'Assistant Editor', date: 'Aug 2026–Sep 2026', points: [
      ['Research', 'Collected material on education figures and thematic studies for Global Education News, using AI-assisted searches for relevant papers and individually verifying original webpages and publications.'],
      ['Writing', 'Independently drafted one profile of Yidan Prize laureate Paul W. Glewwe, integrating his education research, organizing the narrative, and revising the article structure through editorial feedback.'],
      ['Proofreading', 'Reviewed more than 20 education articles for wording and language consistency.'],
      ['Visual planning and sourcing', 'Prepared image materials for 10 thematic education articles, developed search keywords from their subjects, and selected approximately 30 images through Visual China, Paixin, and Freepik, considering relevance and licensing requirements.'] ] } },
  { id: 'evaluation', company: '整数智能信息技术（杭州）有限责任公司', englishCompany: 'Integer Intelligence Information Technology (Hangzhou) Co., Ltd.',
    zh: { role: '市场实习生', date: '2025年10月—2026年1月', points: [
      ['多渠道招募与资源拓展', '参与 SuperGPQA 相关大模型评测数据项目，围绕约50个学科方向开展人员联络，结合小红书、高校论坛、Boss直聘等渠道招募专业出题人员，并参与校园大使筛选及推荐激励机制执行。'],
      ['项目运营与人员协调', '跟进校园大使及出题人员的任务进度与参与反馈，协调处理题目审核、报酬结算等争议，向技术团队反馈操作问题，支持项目跨学科题目生产。'],
      ['质量管理与流程标准化', '制定校园大使招募管理 SOP 及5道示范题目，开展题目分类、格式及基础内容质检，定期组织标注标准说明，协助统一题目生产规范。'],
      ['项目规模', '项目整体覆盖约180个学科方向，累计产出约1500道题目。'] ] },
    en: { role: 'Marketing Intern', date: 'Oct 2025–Jan 2026', points: [
      ['Recruitment and outreach', 'Participated in a SuperGPQA-related LLM evaluation data project, contacted specialists across approximately 50 subjects, recruited question writers through Xiaohongshu, university forums, and BOSS Zhipin, and supported campus ambassador selection and referral incentive execution.'],
      ['Operations and coordination', 'Tracked campus ambassadors and question writers, gathered progress updates and feedback, coordinated question-review and compensation disputes, and reported operational issues to the technical team to support cross-disciplinary question production.'],
      ['Quality and standardization', 'Developed a campus ambassador recruitment and management SOP and five sample questions, checked subject classification, formatting, and basic content, and regularly explained annotation standards to align question production.'],
      ['Project scope', 'The overall project covered approximately 180 subjects and produced approximately 1,500 questions.'] ] } },
  { id: 'teaching', company: '新知朋辈信息发展有限公司', englishCompany: 'Xinzhi Peer Information Development Co., Ltd.',
    zh: { role: '线上课程教师', date: '2025年8月—2025年10月', points: [
      ['课程设计与备课', '基于公司提供的课程框架，设计哲学、逻辑学等主题的案例讨论与互动任务，细化课程引入、案例选择、讨论问题、课后任务与具体教学流程。'],
      ['博雅教育课程教学', '面向一名高中阶段学生完成10次一对一线上教学，每次1小时，涵盖历史人文、理想国相关哲学、逻辑学，以及整理与时间管理等主题。'],
      ['学生需求与个性化调整', '针对学生学习基础薄弱、课堂参与度较低等情况，降低内容难度、放慢授课节奏并增加互动，在学生不愿参与时先了解原因，再按情况示范、调整或跳过活动，且不强迫开启摄像头。'],
      ['课堂组织与学习反馈', '通过生活话题引入、开放式提问、案例与互动组织教学，并邀请学生在课末总结当堂内容，以了解学习情况并调整后续安排。'] ] },
    en: { role: 'Online Course Instructor', date: 'Aug 2025–Oct 2025', points: [
      ['Lesson design and preparation', 'Designed philosophy and logic case discussions and interactive tasks within a company-provided framework, developing introductions, examples, discussion questions, follow-up tasks, and detailed teaching sequences.'],
      ['Liberal education teaching', 'Delivered ten one-hour individual online lessons to a high-school-level learner, covering humanities, philosophy related to Plato’s Republic, logic, organization, and time management.'],
      ['Learner needs and adaptation', 'Responded to limited prior knowledge and low participation by reducing difficulty, slowing the pace, and increasing interaction, asking about reluctance before demonstrating, adapting, or skipping tasks as appropriate, with optional camera use.'],
      ['Classroom interaction and feedback', 'Used everyday topics, open-ended questions, examples, and interaction to organize lessons, inviting learner-led summaries at the end to check understanding and guide subsequent instruction.'] ] } },
  { id: 'crab', company: '陈氏蟹业', englishCompany: 'Chen Shi Crab',
    zh: { role: '运营负责人', date: '2024年10月—至今', points: [
      ['订单履约与供应链协调', '负责礼卡兑换及订单履约管理，通过小程序后台与 Excel 汇总订单需求，协调产品备货、物流发货及异常订单处理。'],
      ['售后流程优化', '针对兑换异常、发货改期及产品损耗等高频问题，梳理标准化处理流程（SOP），建立问题核验、赔付标准及统一沟通话术，提升售后处理的规范性与一致性。'],
      ['客户关系与风险管理', '协调客户、供应商及物流方处理售后争议，通过核查订单及物流记录明确问题原因，推动制定生鲜产品验货与凭证留存规则，并同步至小程序及服务号，完善售后风险管理机制。'],
      ['项目成果', '累计销售礼卡500余张。'] ] },
    en: { role: 'Operations Lead', date: 'Oct 2024–Present', points: [
      ['Fulfillment and supply coordination', 'Managed gift card redemption and order fulfillment, consolidated demand through a mini-program backend and Excel, and coordinated stock preparation, shipping, and exceptional orders.'],
      ['After-sales processes', 'Standardized responses to recurring redemption issues, delivery rescheduling, and product losses through SOPs covering verification, compensation criteria, and consistent communication.'],
      ['Customer relations and risk management', 'Coordinated after-sales disputes among customers, suppliers, and logistics providers, investigated order and shipping records, and helped establish fresh-product inspection and evidence-retention rules published through the mini-program and service account.'],
      ['Project results', 'Sold over 500 gift cards.'] ] } },
  { id: 'content', company: '闻一咨询（北京）有限公司', englishCompany: 'Wenyi Consulting (Beijing) Co., Ltd.',
    zh: { role: '运营', date: '2024年8月—2024年9月', points: [
      ['公众号运营', '负责微信公众号内容规划、撰写与排版。'],
      ['宣传物料设计与制作', '完成公司国际教育板块的宣传册制作，包括内容架构、文案撰写与视觉呈现。'] ] },
    en: { role: 'Operations', date: 'Aug 2024–Sep 2024', points: [
      ['WeChat content', 'Planned, wrote, and formatted content for a WeChat official account.'],
      ['Promotional material design and production', 'Produced brochures for the company’s international education business, covering information structure, copywriting, and visual presentation.'] ] } }
];

const container = document.getElementById('projects');
const languageButton = document.getElementById('language');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const openIds = new Set();
const animations = new Map();
let language = 'zh';
let scrambleFrame = 0;
const noiseCharacters = {
  zh: '山川云海风雨星河林木花叶春秋远近光影墨白言文知行思学方圆上下左右天地日月',
  en: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%?'
};

function glyphs(text, start) {
  const characters = Array.from(text);
  return characters.map((char, i) => {
    const appear = start + i / Math.max(1, characters.length - 1) * 1600;
    return `<span class="glyph" data-appear="${appear}" data-space="${/\s/.test(char)}"><span class="glyph-final">${char === ' ' ? '&nbsp;' : char}</span><span class="glyph-noise" aria-hidden="true"></span></span>`;
  }).join('');
}

function stopScramble() {
  cancelAnimationFrame(scrambleFrame);
  scrambleFrame = 0;
  container.classList.remove('scrambling');
  container.querySelectorAll('.glyph-noise').forEach(node => { node.textContent = ''; });
}

function startScramble() {
  if (reduced.matches) return;
  const characterPool = noiseCharacters[language];
  const cells = Array.from(container.querySelectorAll('.glyph')).map(node => ({
    node, noise: node.querySelector('.glyph-noise'), appear: Number(node.dataset.appear),
    space: node.dataset.space === 'true', settled: false
  }));
  container.classList.add('scrambling');
  const origin = performance.now();
  let previousTick = -1;
  function frame(now) {
    if (reduced.matches) { stopScramble(); return; }
    const elapsed = now - origin;
    const tick = Math.floor(elapsed / 65);
    let unfinished = false;
    for (const cell of cells) {
      const age = elapsed - cell.appear;
      if (age >= 240) {
        if (!cell.settled) {
          cell.node.classList.add('settled');
          cell.noise.textContent = '';
          cell.settled = true;
        }
      } else {
        unfinished = true;
        if (age >= 0 && !cell.space && tick !== previousTick) {
          cell.noise.textContent = characterPool[Math.floor(Math.random() * characterPool.length)];
        }
      }
    }
    previousTick = tick;
    if (unfinished) scrambleFrame = requestAnimationFrame(frame);
    else stopScramble();
  }
  scrambleFrame = requestAnimationFrame(frame);
}

function render(animate = false) {
  stopScramble();
  animations.forEach(animation => animation.cancel());
  animations.clear();
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  const title = language === 'zh' ? '项目经历' : 'Projects';
  document.title = `${language === 'zh' ? 'Yinuo' : 'IRIS'} — ${title}`;
  const brand=document.querySelector('header .brand');brand.textContent=language==='zh'?'Yinuo':'IRIS';brand.setAttribute('aria-label',brand.textContent);
  document.getElementById('page-title').textContent = title;
  document.getElementById('heading').textContent = title;
  languageButton.textContent = language === 'zh' ? 'EN' : '中文';
  languageButton.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换为中文');
  container.innerHTML = projects.map((project, i) => {
    const text = project[language];
    const company = language === 'en' ? project.englishCompany : project.company;
    const open = openIds.has(project.id);
    const label = `${company} — ${text.role} — ${text.date}`;
    return `<section class="project" data-project="${project.id}">
      <h2 class="project-heading"><button type="button" class="project-toggle" id="toggle-${project.id}" aria-expanded="${open}" aria-controls="panel-${project.id}" aria-label="${label}">
        <span class="row-copy" aria-hidden="true"><span class="project-name">${glyphs(company, i * 85)}</span><span class="project-description">${glyphs(text.role, i * 85 + 140)}</span></span>
        <span class="leader" aria-hidden="true"></span><span class="year" aria-hidden="true">${text.date}</span><span class="indicator" aria-hidden="true"></span>
      </button></h2>
      <div class="panel" id="panel-${project.id}" role="region" aria-labelledby="toggle-${project.id}" aria-hidden="${!open}" ${open ? '' : 'hidden inert'}>
        <div class="panel-inner"><div class="body-copy">${text.points.map(([heading, sentence]) => `<p><strong>${heading}${language === 'zh' ? '：' : ': '}</strong>${sentence}</p>`).join('')}${project.id === 'crab' ? `<p><a class="case-link" href="crab/index.html?lang=${language}">${language === 'zh' ? '查看图片' : 'View gallery'} ↗</a></p>` : project.id === 'content' ? `<p><a class="case-link" href="brochure/index.html?lang=${language}">${language === 'zh' ? '查看宣传册' : 'View brochures'} ↗</a></p>` : ''}</div></div>
      </div></section>`;
  }).join('');
  if (animate) startScramble();
}

function toggle(button) {
  const id = button.closest('.project').dataset.project;
  const panel = document.getElementById(button.getAttribute('aria-controls'));
  const opening = button.getAttribute('aria-expanded') !== 'true';
  const start = panel.hidden ? 0 : panel.getBoundingClientRect().height;
  const previous = animations.get(panel);
  if (previous) previous.cancel();
  if (!opening && panel.contains(document.activeElement)) button.focus();
  panel.hidden = false;
  panel.inert = !opening;
  panel.toggleAttribute('inert', !opening);
  panel.setAttribute('aria-hidden', String(!opening));
  button.setAttribute('aria-expanded', String(opening));
  if (opening) openIds.add(id); else openIds.delete(id);
  panel.style.height = 'auto';
  const end = opening ? panel.scrollHeight : 0;
  if (reduced.matches) {
    panel.hidden = !opening;
    panel.style.height = '';
    return;
  }
  panel.style.height = `${start}px`;
  const animation = panel.animate([{ height: `${start}px` }, { height: `${end}px` }], {
    duration: 420, easing: 'cubic-bezier(.22,.68,0,1.01)', fill: 'forwards'
  });
  animations.set(panel, animation);
  animation.onfinish = () => {
    if (animations.get(panel) !== animation) return;
    panel.style.height = opening ? 'auto' : '0px';
    panel.hidden = !opening;
    animation.cancel();
    animations.delete(panel);
  };
}

container.addEventListener('click', event => {
  const button = event.target.closest('.project-toggle');
  if (button) toggle(button);
});
languageButton.addEventListener('click', () => {
  language = language === 'zh' ? 'en' : 'zh';
  render(true);
});
reduced.addEventListener('change', () => {
  if (reduced.matches) render(false);
});
render(true);

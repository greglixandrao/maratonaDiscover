const express = require('express');
const routes = express.Router();

const views = __dirname + '/views/';

const profile = {
  name: 'Greg Lixandrão',
  avatar: 'https://avatars.githubusercontent.com/u/13009208?v=4',
  'monthly-budget': 2000,
  'days-per-week': 5,
  'hours-per-day': 4,
  'vacation-per-year': 4,
  'value-hours': 75,
};

const jobs = [
  {
    id: 1,
    name: 'Pizzaria Guloso',
    'daily-hours': 2,
    'total-hours': 1,
    createdAt: Date.now(),
  },
  {
    id: 2,
    name: 'OneTwo Project',
    'daily-hours': 3,
    'total-hours': 47,
    createdAt: Date.now(),
  },
];

function remainingDays(job) {
  // calculo de tempo restante
  const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed();

  const createdDate = new Date(job.createdAt);
  const dueDay = createdDate.getDate() + Number(remainingDays);
  const dueDateInMs = createdDate.setDate(dueDay); // Data futura de entrega no job
  const timeDiffInMs = dueDateInMs - Date.now();

  // transformar milli em dias
  const dayInMs = 1000 * 60 * 60 * 24;
  const dayDiff = Math.floor(timeDiffInMs / dayInMs);
  // restam x dias
  return dayDiff;
}

routes.get('/', (req, res) => {
  const updateJobs = jobs.map((job) => {
    // ajustes nos jobs
    const remaining = remainingDays(job);
    const status = remaining <= 0 ? 'done' : 'progress';
    return {
      ...job,
      remaining,
      status,
      budget: profile['value-hours'] * job['total-hours'],
    };
  });

  return res.render(views + 'index', { jobs: updateJobs });
});

routes.get('/job', (req, res) => res.render(views + 'job'));

routes.post('/job', (req, res) => {
  const lastId = jobs[jobs.length - 1]?.id || 1;

  jobs.push({
    id: lastId + 1,
    name: req.body.name,
    'daily-hours': req.body['daily-hours'],
    'total-hours': req.body['total-hours'],
    createdAt: Date.now(), // atribuindo a data de hoje
  });
  return res.redirect('/');
});

routes.get('/job/edit', (req, res) => res.render(views + 'job-edit'));

routes.get('/profile', (req, res) =>
  res.render(views + 'profile', { profile })
);

routes.get('/index.html', (req, res) => {
  return res.redirect('/');
});

module.exports = routes;

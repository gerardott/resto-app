import createApplication from '@feathersjs/feathers';
import feathers from '@feathersjs/client';
import rest from '@feathersjs/rest-client';
import localstorage from 'feathers-localstorage';
import { message } from 'antd';

const API_URL = process.env.REACT_APP_API_URL;

interface Sort {
  [key: string]: 1 | -1
}

interface Query extends createApplication.Query {
  $limit?: number
  $skip?: number
  $sort?: Sort
}
interface Params<T> extends createApplication.Params {
  query?: Query | Partial<T>
}
interface Paginated<T> extends createApplication.Paginated<T> { }

interface Service<T> extends createApplication.Service<T> {
  find(params?: Params<T>): Promise<Paginated<T>>;
}

// class CustomService<T> extends MockService<T> {
//   findAll(params: Params) {
//     params.paginate = false;

//     return super.find(params);
//   }
// }

export class MockServiceBuilder {
  static build<T>(name: string, seed?: T[]): Service<T> {
    const app = feathers();
    app.use(`/${name}`, localstorage({
      name: name,
      startId: 1,
      storage: window.localStorage,
      throttle: 100,
      paginate: { default: 10 }
    }))

    const service = app.service(name) as Service<T>;
    service.hooks({
      after: {
        // find: [async (context) => {
        //   if (context.result.data) {
        //     context.result.data = context.result.data.map(x => ({ ...x, createdAt: moment(x.createdAt) }));
        //   }
        // }]
      }
    })

    if (seed) {
      (async () => {
        const hasData = (await service.find()).total > 0;
        if (!hasData) {
          seed.forEach(async item => {
            await service.create(item);
          });
        }
      })();
    }

    return app.service(name);
  }
}




export class ServiceBuilder {
  static build<T>(name: string, seed?: T[], msg: boolean = true): Service<T> {
    const app = feathers();
    const restClient = rest(API_URL);
    app.configure(restClient.fetch(window.fetch));

    const service = app.service(name) as Service<T>;
    const defaultData = seed || [];
    service.hooks({
      error(context) {
        const errorMessage = context.error.Message || context.error.title;
        console.error(`Error in '${context.path}Service' method '${context.method}'.`, errorMessage);
        message.error(errorMessage);
        context.result = { data: defaultData, total: defaultData.length };
        return context;
      },
      after(context) {
        const saveMethods: (typeof context.method)[] = ['create', 'update', 'patch'];
        if (msg && saveMethods.includes(context.method)) {
          message.success(`${context.service.name} has been saved successfully`);
        }
      },

    })

    return service;
  }
}

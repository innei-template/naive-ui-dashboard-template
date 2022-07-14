# Naive UI Dashboard Template

This template is taken from [Mx Space Admin v2](https://github.com/mx-space/mx-admin) and styled the same way.

- WindiCSS
- Vue 3 Tsx
- PostCSS
- Pinia

# Usage

Just use it as a regular template, you can style it in 'configs.json'.

```
pnpm i
pnpm run dev
```

# Addons

## REST Request

You can check code from `src/utils/rest.ts`, this is a simple request wrapper with umi-request or you can replace with another request library.

This usage is very easy and clearly. E.g.

```ts
import { RESTManager } from 'utils/rest.ts'

RESTManager.api.your.request.path.get<ResponseType>() // will GET https://endpoint/your/request/path
```

## Setup Api

This template provide a simple debug view for api testing in route `/setup-api`. This view provide a form to set temporarily endpoint. And change your request endpoint immediately. By this function, you can test local server api but on production environment.

![](https://cdn.jsdelivr.net/gh/Innei/fancy@master/2022/0706212514.png)


# UI screenshots

![](https://cdn.jsdelivr.net/gh/Innei/fancy@master/2021/0623195639.png)
![](https://cdn.jsdelivr.net/gh/Innei/fancy@master/2021/0623195623.png)

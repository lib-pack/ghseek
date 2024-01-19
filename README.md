<h1 align="center">Ghseek</h1>

<p align="center">这是一个github加速器通过hosts实现</p>

<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 1" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-1-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://github.com/lib-pack/ghseek/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://codecov.io/gh/lib-pack/ghseek" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/lib-pack/ghseek?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/lib-pack/ghseek/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
	<a href="http://npmjs.com/package/ghseek"><img alt="📦 npm version" src="https://img.shields.io/npm/v/ghseek?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

## Feature

- 下载克隆 github 资源加速
- Github DNS 加速支持
- gist DNS 加速支持

## Usage

> 注意目前只支持 linux、macos 系统。

```shell
npm i -g ghseek
```

```shell
ghseek seek # 更新本地的 hosts 文件来加速 github 的 push、pull、clone 等操作

ghseek clone <github clone url> [目录位置] # 加速克隆代码
ghseek down <github url> [文件名称] # 加速下载github文件，github url可以是 release url、raw url
```

## Append Hosts

添加的 hosts 类似于下面的内容，IP是通过 https://sites.ipaddress.com 获取的最新 DNS IP.

```
# ghseek github
140.82.112.3 github.com
151.101.65.194 github.global.ssl.fastly.net
185.199.109.133 raw.githubusercontent.com
140.82.112.4 gist.github.com
185.199.109.133 camo.githubusercontent.com
140.82.112.22 collector.github.com
140.82.114.5 api.github.com
185.199.109.133 avatars.githubusercontent.com
185.199.109.133 raw.github.com
# ghseek end
```

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/WumaCoder"><img src="https://avatars.githubusercontent.com/u/39021696?v=4?s=100" width="100px;" alt="WumaCoder"/><br /><sub><b>WumaCoder</b></sub></a><br /><a href="https://github.com/lib-pack/ghseek/commits?author=WumaCoder" title="Code">💻</a> <a href="#content-WumaCoder" title="Content">🖋</a> <a href="https://github.com/lib-pack/ghseek/commits?author=WumaCoder" title="Documentation">📖</a> <a href="#ideas-WumaCoder" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-WumaCoder" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-WumaCoder" title="Maintenance">🚧</a> <a href="#projectManagement-WumaCoder" title="Project Management">📆</a> <a href="#tool-WumaCoder" title="Tools">🔧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->

<!-- You can remove this notice if you don't want it 🙂 no worries! -->

> 💙 This package was templated with [`create-typescript-app`](https://github.com/JoshuaKGoldberg/create-typescript-app).

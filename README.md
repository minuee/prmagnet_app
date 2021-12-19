## PRMagnet-ReactNative

# React Navigation 기반

# react native 프로젝트 생성

> react-native init prMagnet

# 라이브러리 최신화

> yarn-check -u

# 패키지 파일에서 ^(버전호환) 제거

- 라이브러리의 업데이트 오류 방지 목적

# 기본 설정 파일 저장(프로젝트 루트)

.editorconfig
.eslintrc
.gitignore
.prettierignore
.prettierrc

# VSCode 환경 설정(settings.json)

- 파일 > 기본 설정 > 설정 메뉴(Ctrl+,)에서 편집기 오른쪽 상단의 설정 열기 버튼 클릭

```
{
  "workbench.editor.enablePreview": false,
  "window.zoomLevel": 0,
  "workbench.startupEditor": "none",
  "javascript.format.enable": false,
  "editor.formatOnSave": true,
  "files.eol": "\n",
  "typescript.reportStyleChecksAsWarnings": false
}
```

# VSCode extensions(Ctrl+Shitf+x)

Debugger for Chrome
EditorConfig for VS Code
ESLint
Korean Language Pack for Visual Studio Code
Prettier - Code formatter
React Native Tools

# GIT 개행문자 설정

> git config --global core.eol lf
> git config --global core.autocrlf input

이 명령어를 실행 한 후 소스를 다시 내려 받아야 함

# react-navigation 라이브러리 추가

> yarn add @react-navigation/native
> yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-tab-view react-native-safe-area-context @react-native-community/masked-view
> yarn add @react-navigation/stack

# 기본 라이브러리 추가

> yarn add axios lodash

# redux 라이브러리 추가

> yarn add react-redux redux redux-saga
> yarn add --dev redux-devtools-extension

# pods 설치(iOS)

> npx pod-install ios

# 배포 설정 쉘 스크립트 권한 부여

> chmod 755 release.sh

# 프로젝트 실행(에뮬레이터)

> ./release.sh dev android;react-native run-android --appIdSuffix=debug --variant=debug'
> ./release.sh dev;react-native run-ios --simulator="iPhone 12 Pro Max"

# apk 생성 명령(releaseStaging/release)

> ./release.sh stg android;react-native run-android --appIdSuffix=releaseStaging --variant=releaseStaging
> ./release.sh android;cd android;./gradlew clean;cd ..;react-native run-android --variant=release

# iOS 단말 실행

> ./release.sh dev;react-native run-ios --device --configuration Debug


## 라이브러리 추가 2021.11.05
> yarn add react-native-version-check
> yarn add react-native-exit-app
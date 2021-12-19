import React from 'react'
import {linkTo} from '@storybook/addon-links'
import {storiesOf} from '@storybook/react-native'

import RootScreen from '../../src/screens/RootScreen'

const stories = storiesOf('메인페이지', module)
stories.add('메인페이지', () => <RootScreen />)

import React, {PureComponent} from 'react'
import {SafeAreaView, ScrollView, View, TouchableOpacity, Image, Linking} from 'react-native'
import {connect} from 'react-redux'
import {Grid, Col, Row} from 'react-native-easy-grid'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'

const screens = [
  ['로그인', 'https://zpl.io/Vx7Agzw', 'LoginScreen'],
  ['마이페이지', 'https://zpl.io/VKex1R8', 'MyPageScreen'],
  ['계정설정', 'https://zpl.io/a8L8mgg', 'AccountSettingScreen'],
  ['알림 설정', 'https://zpl.io/agjqw91', 'NotiSettingScreen'],
  ['문의하기', 'https://zpl.io/anxnGpJ', 'ContactScreen-Contact'],
  ['문의하기-팝업', 'https://zpl.io/2ZeRpLd', 'ContactScreen'],
  ['문의내역', 'https://zpl.io/b6Ln81P', 'ContactScreen-ContactConfirm'],
  ['브랜드-알림 아이콘', 'https://zpl.io/2GLDxGm', 'NotificationScreen'],
  ['브랜드-홈', 'https://zpl.io/2Ze7GX1', 'HomeScreen'],
  ['디지털쇼룸', 'https://zpl.io/29L7BwW', 'DigitalSRScreen'],
  ['디지털쇼룸-상세', 'https://zpl.io/bANm4N6', 'DigitalSRDetailScreen'],
  ['필터-소재', 'https://zpl.io/adlEkj7', 'FilterScreen'],
  ['필터-가능일자', 'https://zpl.io/2yrgLWJ', 'FilterScreen'],
  ['필터-컬러', 'https://zpl.io/VDLgGGW', ''],
  ['필터-카테고리', 'https://zpl.io/VqdyEp4', 'FilterScreen'],
  ['필터-셋팅-공지', 'https://zpl.io/blQe9NX', 'FilterSettingScreen'],
  ['필터-셋팅-문의번호', 'https://zpl.io/bWlye1p', 'FilterSettingScreen'],
  ['필터-셋팅-쇼룸문의', 'https://zpl.io/brdG4k7', 'FilterSettingScreen'],
  ['룩북리스트', 'https://zpl.io/bl9388X', 'LookBookScreen'],
  ['룩북리스트-더보기', 'https://zpl.io/2GLj7E9', 'LookBookScreen'],
  ['룩북상세', 'https://zpl.io/bzr3k8X', 'LookBookDetailScreen'],
  ['룩북상세-마우스오버', 'https://zpl.io/2pE3y1E', 'LookBookDetailScreen'],
  ['룩북-링크전송', 'https://zpl.io/bov3o1m', ''],
  ['룩북 링크전송-이메일', 'https://zpl.io/aBLzmwm', ''],
  ['룩북 쉐어-카톡', 'https://zpl.io/bWe8KQ1', ''],
  ['스케쥴-By Date-달력', 'https://zpl.io/bJeD5OE', 'SelectScheduleScreen'],
  ['스케쥴', 'https://zpl.io/br43Ymr', 'BrandSchedulerScreen'],
  ['스케쥴-메모-룩선택', 'https://zpl.io/bzr3kyX', 'ScheduleMemoScreen'],
  ['스케쥴-메모작성', 'https://zpl.io/VQkNmo5', 'ScheduleMemoScreen'],
  ['스케쥴-메모삭제', 'https://zpl.io/25L4ZeW', 'BrandSchedulerScreen'],
  ['스케쥴-메모삭제완료', 'https://zpl.io/VQkNmo4', 'BrandSchedulerScreen'],
  ['연결시트-날짜선택', 'https://zpl.io/VDLgG7v', 'SelectScheduleScreen'],
  ['브랜드-연결시트-리턴', 'https://zpl.io/2vw31yr', 'LinkSheetScreen'],
  ['브랜드-연결시트-리턴2', 'https://zpl.io/beQ3ngq', 'LinkSheetScreen'],
  ['브랜드-연결시트-리턴밀기', 'https://zpl.io/bl9Kyme', 'LinkSheetScreen'],
  ['브랜드-연결시트-리턴팝업', 'https://zpl.io/bJeD5qr', 'LinkSheetScreen'],
  ['브랜드-연결시트-리턴체크완료', 'https://zpl.io/VYeqwBM', ''],
  ['브랜드-연결시트-노티피케이션', 'https://zpl.io/b6LKZMR', ''],
  ['브랜드-연결시트-노티피케이션1', 'https://zpl.io/aRe4rYv', ''],
  ['브랜드-연결시트-샌드아웃', 'https://zpl.io/bALRjq8', ''],
  ['연결시트-환경설정-공지', 'https://zpl.io/2jD3jwp', 'NoticeScreen'],
  ['브랜드-연결시트-샌드아웃2', 'https://zpl.io/VDLgGnO', ''],
  ['브랜드-연결시트-From밀기', 'https://zpl.io/V4LNZlz', ''],
  ['브랜드-연결시트-From팝업', 'https://zpl.io/a71PlE8', ''],
  ['브랜드-연결시트-From체크완료', 'https://zpl.io/aBLzmNL', ''],
  ['브랜드-연결시트-From전체체크', 'https://zpl.io/aR6G810', ''],
  ['브랜드-연결시트-From전체체크-1', 'https://zpl.io/bopLeDg', ''],
  ['브랜드-연결시트-From전체체크완료', 'https://zpl.io/aBLzmqk', ''],
  ['연결시트-전화걸기', 'https://zpl.io/2vw9MlQ', ''],
  ['매거진-홈', 'https://zpl.io/25L4ZGo', 'HomeScreen'],
  ['매거진-알림아이콘', 'https://zpl.io/aNexZKe', 'NotificationScreen'],
  ['Favorites', 'https://zpl.io/29XvJzd', 'FavoritesScreen'],
  ['필터-브랜드', 'https://zpl.io/VKXW7eE', ''],
  ['필터-카테고리', 'https://zpl.io/bzK09XM', ''],
  ['필터-컬러', 'https://zpl.io/bANWp5B', ''],
  ['필터-소재', 'https://zpl.io/VYlQmJm', ''],
  ['디지털쇼룸', 'https://zpl.io/bJXXWKK', 'DigitalSRScreen'],
  ['디지털쇼룸-선택', 'https://zpl.io/bzK0vMX', 'DigitalSRScreen'],
  ['디지털쇼룸-선택요령', 'https://zpl.io/2pw00wN', 'DigitalSRScreen'],
  ['Sample Requests', 'https://zpl.io/bANOZ5n', 'SampleRequestsScreen'],
  ['Sample Requests-리스트', 'https://zpl.io/bALRjBo', ''],
  ['Sample Requests-수정/삭제', 'https://zpl.io/bWe8KNk', ''],
  ['Sample Requests-삭제', 'https://zpl.io/VYeqwrp', ''],
  ['Sample Requests-삭제완료', 'https://zpl.io/a3LE31d', ''],
  ['Sample Requests-수정', 'https://zpl.io/aM6R0e7', 'SampleRequestsScreen'],
  ['스케쥴-By Date', 'https://zpl.io/bov3o8E', 'MagazineSchedulerScreen'],
  ['스케쥴-By Date-달력', 'https://zpl.io/VOevNdX', 'SelectScheduleScreen'],
  ['스케쥴-By Brand', 'https://zpl.io/aXe7L5M', 'MagazineSchedulerScreen'],
  ['스케쥴-By Brands 검색', 'https://zpl.io/a3LE3jd', ''],
  ['연결시트-날짜선택', 'https://zpl.io/agj3ekA', ''],
  ['매거진-연결시트-픽업', 'https://zpl.io/25L4ZpQ', 'LinkSheetScreen'],
  ['매거진-연결시트-픽업2', 'https://zpl.io/29Lm4Kd', 'LinkSheetScreen'],
  ['매거진-연결시트-From-밀기', 'https://zpl.io/bzr3k6z', ''],
  ['매거진-연결시트-From팝업', 'https://zpl.io/25L4Zp0', ''],
  ['매거진-연결시트-From체크완료', 'https://zpl.io/Vx738wm', ''],
  ['매거진-연결시트-노티피케이션', 'https://zpl.io/anx3OLY', ''],
  ['매거진-연결시트-노티피케이션-1', 'https://zpl.io/a71PlQW', ''],
  ['매거진-연결시트-All Check', 'https://zpl.io/anxnzPJ', ''],
  ['매거진-연결시트-All Check팝업', 'https://zpl.io/aBLzmWp', ''],
  ['매거진-연결시트-All Check완료-1', 'https://zpl.io/bl938L0', ''],
  ['매거진-연결시트-샌드아웃', 'https://zpl.io/br43YL5', ''],
  ['매거진-연결시트-샌드아웃2', 'https://zpl.io/2yr38Wn', ''],
  ['매거진-연결시트-TO밀기', 'https://zpl.io/a3LE3RA', ''],
  ['매거진-연결시트-TO팝업', 'https://zpl.io/2jD3jYr', ''],
  ['매거진-연결시트-TO완료', 'https://zpl.io/VDLgGWr', ''],
  ['매거진-연결시트-전화걸기', 'https://zpl.io/adg34NE', ''],
  ['마이페이지', 'https://zpl.io/aMeoB1R', 'MyPageScreen'],
  ['마이페이지-알림설정', 'https://zpl.io/aB4jzE0', 'NotiSettingScreen'],
  ['계정설정', 'https://zpl.io/VYeqwXe', 'AccountSettingScreen'],
  ['문의하기', 'https://zpl.io/V1XxJDE', 'ContactScreen-Contact'],
  ['문의하기-팝업', 'https://zpl.io/aRe4rXK', 'ContactScreen'],
  ['문의내역', 'https://zpl.io/agj3eWM', 'ContactScreen-ContactConfirm'],
]

class DevNavigationScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
  }
  componentDidMount() {
    this.modalOption('DevNavigation')
  }
  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={{paddingVertical: 10}}>
            <Grid>
              <Row style={styles.headerWrapper}>
                <Col style={styles.numberWrapper}>
                  <Text style={styles.headerText}>No.</Text>
                </Col>
                <Col style={styles.sectionHeadWrapper}>
                  <Text style={styles.headerText}>제플린</Text>
                </Col>
                <Col style={styles.sectionHeadWrapper}>
                  <Text style={styles.headerText}>화면</Text>
                </Col>
              </Row>
              {_.map(screens, (item, index) => {
                return (
                  <Row key={index}>
                    <Col style={styles.numberWrapper}>
                      <Text style={styles.headerText}>{index + 1}</Text>
                    </Col>
                    <Col style={styles.sectionWrapper}>
                      <TouchableOpacity onPress={async () => await Linking.openURL(item[1])}>
                        <Text style={styles.headerText} numberOfLines={1}>
                          {item[0]}
                        </Text>
                      </TouchableOpacity>
                    </Col>
                    <Col style={styles.sectionWrapper}>
                      <TouchableOpacity onPress={() => (item[2] ? this.pushTo(item[2]) : null)}>
                        <Text style={styles.headerText}>{item[2]}</Text>
                      </TouchableOpacity>
                    </Col>
                  </Row>
                )
              })}
              {/* </Col> */}
              {/* <Col style={{width: mConst.wWidth / 2}}></Col> */}
            </Grid>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(DevNavigationScreen)

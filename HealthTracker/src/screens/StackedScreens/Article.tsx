import React, {useEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {BottomTabNavigatorPropType} from '../../navigators/BottomTabNavigator';
import {getArticle} from '../../services/data';
import {ArticleDataType} from '../../types/article';
import Video from 'react-native-video';
import {colors, marginStyles, paddingStyles} from '../../styles/common';
import IconTextButton from '../../components/IconTextButton';

type Props = {
  navigation: BottomTabNavigatorPropType;
  route: any;
};

const Article = (props: Props) => {
  const {
    route: {
      params: {articleId},
    },
  } = props;

  const [articleData, setArticleData] = React.useState<ArticleDataType>();
  const [paused, setPaused] = React.useState(true);
  const videoRef = React.useRef<Video>(null);

  const playHandler = () => {
    setPaused(false);
  };

  useEffect(() => {
    getArticle(articleId).then(article => {
      console.log('Article', article);
      setArticleData(article);
    });
  }, [articleId]);

  if (!articleData) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>{articleData.title}</Text>
        {articleData.visualType &&
        articleData.visual !== undefined &&
        articleData.visualType === 'image' ? (
          <Image source={{uri: articleData.visual}} style={styles.image} />
        ) : (
          <View style={styles.videoContainer}>
            <Video
              source={{uri: articleData.visual}}
              ref={videoRef}
              style={[styles.video, paused ? styles.pausedVideo : {}]}
              resizeMode="cover"
              onPlaybackResume={() => {
                setPaused(false);
                console.log('Resumed');
              }}
              onTouchStart={() => {
                setPaused(!paused);
                console.log('Touched');
              }}
              paused={paused}
              poster={articleData.coverImage}
              posterResizeMode="stretch"
            />
            <View style={[styles.playButton, !paused && styles.hidden]}>
              <IconTextButton
                textColor={colors.white}
                title="Play Now"
                pressHandler={playHandler}
              />
            </View>
          </View>
        )}
        <Text style={styles.content}>{articleData.content}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: paddingStyles.medium.padding,
    backgroundColor: colors.white,
  },
  image: {
    width: '100%',
    objectFit: 'fill',
    height: 200,
    borderRadius: paddingStyles.medium.padding,
    marginVertical: marginStyles.medium.margin,
  },
  video: {
    width: '100%',
    height: 200,
    borderRadius: paddingStyles.small.padding,
    marginVertical: marginStyles.medium.margin,
  },
  pausedVideo: {
    opacity: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
  content: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
  },
  videoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    position: 'absolute',
  },
  hidden: {
    display: 'none',
  },
});

export default Article;

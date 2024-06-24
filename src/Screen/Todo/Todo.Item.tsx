import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';

import {AppBlock, AppText} from '@starlingtech/element';
import moment from 'moment';

import IconChecked from 'assets/svg/IconChecked';
import IconChevronRight from 'assets/svg/IconChevronRight';
import IconSquare from 'assets/svg/IconSquare';
// import {navigate} from 'src/navigation/navigation';
import NavigationService from 'src/utils/NavigationService';
import {RespTodo_Data} from 'src/types/todo.types';
import {useNavigation} from '@react-navigation/native';

export function TodoItem({item}: {item: RespTodo_Data}) {
  const [isCompleted, setIsCompleted] = useState(item.status === 'Completed');
  const navigation = useNavigation();
  let bg = '#1bbf89';
  if (item.priority === 'Medium') {
    bg = '#f7af3e';
  }
  if (item.priority === 'High') {
    bg = '#DB524B';
  }

  const onPress = () => {
    setIsCompleted(!isCompleted);
    navigation.navigate('UpdateTaskScreen', {id: item.id});
  };

  useEffect(() => {
    setIsCompleted(item.status === 'Completed');
  }, [item.status]);

  return (
    <TouchableOpacity onPress={onPress}>
      <AppBlock row ph={16} mb={16} border={[0, 0, 1]} pb={5}>
        <AppBlock mr={6}>
          {isCompleted ? (
            <IconChecked opacity={0.7} />
          ) : (
            <IconSquare opacity={0.3} />
          )}
        </AppBlock>
        <AppBlock flex>
          <AppText color="textFocus" weight="500">
            {item.text}
          </AppText>
          <AppBlock
            style={{backgroundColor: bg}}
            alignSelf="baseline"
            padding={[4, 8]}
            radius={4}
            mt={5}>
            <AppText size={12} color="white">
              {item.priority}
            </AppText>
          </AppBlock>

          <AppText color="placeholder" size={14} mt={5}>
            {moment(item.time_scheduled).format('MM/DD/YYYY HH:mmA')}
          </AppText>
        </AppBlock>
        <IconChevronRight />
      </AppBlock>
    </TouchableOpacity>
  );
}

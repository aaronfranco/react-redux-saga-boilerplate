import React from 'react';
import { shallow } from 'enzyme';

import { Music } from 'containers/Music';

const mockDispatch = jest.fn();

const props = {
  dispatch: mockDispatch,
  jane: {
    username: '',
    name: '',
    music: []
  },
};

function setup(ownProps = props) {
  return shallow(
    <Music { ...ownProps } />,
    { attachTo: document.getElementById('react') }
  );
}

describe('Music', () => {
  const wrapper = setup();

  it('should be a Component', () => {
    expect( wrapper.instance() instanceof React.Component ).toBe(true);
  });

  it('should render properly', () => {
    expect( wrapper.find('.app__music') ).toBePresent();
  });

  // it('should render a Loader without data', () => {
  //   expect(wrapper.find('Loader')).toBePresent();
  // });

  it('should have dispatched an action on mount', () => {
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      payload: {},
      type: 'GET_JANE_REQUEST',
    });
  });

  it('should render some items when data arrives', () => {
    wrapper.setProps({
      jane: {
           username: "jane",
           name: "Jane Doe",
           music: [
                {
                     "title": "Track One",
                     "file": '414365__erokia__ambient-wave-28.wav'
                },
                {
                     "title": "Track Two",
                     "file": "414497__toiletrolltube__hellocatfood-b6b7-o.wav"
                },
                {
                     'title': "Track Three",
                     "file": '414514__eardeer__daybreak.wav'
                }
           ]
      },
    });

    expect(wrapper.find('.app__music__grid')).toMatchSnapshot();
  });


});

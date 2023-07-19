import { Link } from 'react-router-dom';
import type { FC } from 'react';

import { Button, Header, HeaderNavigation, Icon } from '@wf/components';

import type { IHeaderComponent } from './HeaderComponentTypes';
import { HeaderItems } from './HeaderComponentTypes';

import styles from './HeaderComponent.module.scss';

const HeaderComponent: FC<IHeaderComponent> = ({ title, link, actions }) => (
  <Header className={styles.header_container}>
    <HeaderNavigation.Title>
      {link ? (
        <Link to={link}>
          <HeaderNavigation.Button>
            <Icon name="ic_arrow_left" size={14} />
          </HeaderNavigation.Button>
          <h2>{title}</h2>
        </Link>
      ) : (
        <h2>{title}</h2>
      )}
    </HeaderNavigation.Title>
    {actions && (
      <HeaderNavigation.Actions>
        {actions.map(
          (item) =>
            item.field === HeaderItems.button &&
            (item.link ? (
              <Link key={item.name} to={item.link}>
                <Button ghost={item.ghost} color={item.color}>
                  {item.text}
                </Button>
              </Link>
            ) : (
              <Button key={item.name} ghost={item.ghost} color={item.color} onClick={item.handleSubmit}>
                {item.text}
              </Button>
            ))
        )}
      </HeaderNavigation.Actions>
    )}
  </Header>
);

export default HeaderComponent;

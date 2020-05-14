import React from 'react';
import {Menu, Container, Button} from 'semantic-ui-react';

interface IProps {
    openCreateForm: () => void
}

const NavBar: React.FC<IProps> = ({openCreateForm}) => {
    return (
        <Menu fixed={"top"} inverted>

            <Container>
                <Menu.Item header={true}><img style={{marginRight: "10px"}} src={"assets/logo.png"} alt="logo"/>Reactivities
                </Menu.Item>
                <Menu.Item
                    name='Activities'
                />
                <Menu.Item>
                    <Button positive content='Create Activity' onClick={openCreateForm}/>
                </Menu.Item>
            </Container>
        </Menu>
    )
    
}

export default NavBar;
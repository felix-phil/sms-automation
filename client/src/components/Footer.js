import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'

const Footer = () => {
    return (
        <Box mt={6}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link to="/">
                    SMS Automation
                </Link>
                {' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
                <small>A project to fulfill the requirement for HND Computer Science</small>
            </Typography>
        </Box>
    )
}

export default Footer

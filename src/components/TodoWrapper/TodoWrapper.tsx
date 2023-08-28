import React, { ReactNode } from 'react'
import styles from './TodoWrapper.module.scss'

interface WrapperProps {
  children: ReactNode
}

const TodoWrapper: React.FC<WrapperProps> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>
}

export default TodoWrapper
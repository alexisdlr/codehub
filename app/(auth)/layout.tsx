interface AuthLayoutProps {
  children: React.ReactNode
}
const AuthLayout = ({children}: AuthLayoutProps) => {
  return (
    <div className="flex w-full h-full items-center justify-center">{children}</div>
  )
}

export default AuthLayout
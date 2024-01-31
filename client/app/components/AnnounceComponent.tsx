
interface Props {
  message: string
}
export default function AnnounceComponent({ message }: Props) {

  return (
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-[2px] w-2/6 rounded-full">
        <div className={"w-full h-full bg-white dark:bg-black px-3 md:px-4 py-1 rounded-full"}>
          <h1 className="text-black dark:text-white md:text-base text-xs">{message}</h1>
        </div>
      </div>
  )
}
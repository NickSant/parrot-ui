import * as AvatarComponent from '@radix-ui/react-avatar'

type AvatarProps = {
  name: string
  url: string
  size: number
}

export const Avatar = ({ name, url, size }: AvatarProps) => {
  return (
    <AvatarComponent.Root className={`bg-black inline-flex h-[${size}px] w-[${size}px] select-none items-center justify-center overflow-hidden rounded-full align-middle`}>
      <AvatarComponent.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={url}
        alt={name}
      />
      <AvatarComponent.Fallback
        className={`text-white leading-1 flex h-full w-full items-center justify-center bg-blue-400 text-[15px] font-medium`}
        delayMs={600}
      >
        {name[0]}
      </AvatarComponent.Fallback>
    </AvatarComponent.Root>
  )
}

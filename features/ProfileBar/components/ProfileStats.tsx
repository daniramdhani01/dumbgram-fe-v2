interface ProfileStatsProps {
    post: number;
    followers: number;
    following: number;
    className?: string;
}

export default function ProfileStats({post = 0, followers = 0, following = 0, className}:ProfileStatsProps) {
  return (
    <div className={`flex justify-center ${className}`}>
        <div className='w-1/3 text-center'>
            <h3 className='text-lg text-primary/60'>Posts</h3>
            <span className="text-lg">{post}</span>
        </div>
        <div className='w-1/3 text-center border-x-1'>
            <h3 className='text-lg text-primary/60'>Followers</h3>
            <span className="text-lg">{followers} M</span>
        </div>
        <div className='w-1/3 text-center'>
            <h3 className='text-lg text-primary/60'>Following</h3>
            <span className="text-lg">{following}</span>
        </div>
    </div>
  )
}

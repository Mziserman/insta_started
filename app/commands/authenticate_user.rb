class AuthenticateUser
  prepend SimpleCommand

  def initialize(name)
    @name = name
  end

  def call
    JsonWebToken.encode(user_id: user.id) if user
  end

  private
  attr_accessor :email

  def user
    user = User.find_by_name(name)
    return user if user
  end
end

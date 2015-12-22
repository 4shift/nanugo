class Ability
  include CanCan::Ability

  def initialize(user)
    if user.has_role?('admin')
      can :read, :all
      can :access, :rails_admin
      can :dashboard
      if user.has_role?('superadmin')
        can :manage, :all
      else
        can :manage, []
      end
    else
      can :read, []
      can :create, []
    end
  end
end

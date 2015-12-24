# define permissions for all types of users
class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)

    if user.has_role?('admin')
      admin user
    else
      customer user
    end
  end

  protected

  def admin(user)
    can :read, :all
    can :access, :rails_admin
    #
    # # customers can view their own tickets, its replies and attachments
    # can [:create, :read], Reply, ticket: { user_id: user.id }
    #
    # # customers can edit their own account
    # can :update, User, id: user.id
    #
    # # customer can see al tickets labeled with his/her labels
    # can :read, Ticket, Ticket.viewable_by(user) do |ticket|
    #   # at least one label_id overlap
    #   ticket.user == user || (ticket.label_ids & user.label_ids).size > 0
    # end
    #
    # can [:create, :read], Reply do |reply|
    #   # at least one label_id overlap
    #   (reply.ticket.label_ids & user.label_ids).size > 0
    # end
  end

  def customer(user)
    can :read, Item
    can :create, Item
    can :update, User, id: user.id
    #
    # # limited agents can view their own tickets, replies and attachments
    # can [:create, :read], Reply, ticket: { user_id: user.id }
    #
    # # limited agents can edit their own account
    # can :update, User, id: user.id
    #
    # # limited agents can see al tickets labeled with his/her labels
    # can [:read, :update], Ticket, Ticket.viewable_by(user) do |ticket|
    #   # at least one label_id overlap or assigned to
    #   ticket.user == user || (ticket.label_ids & user.label_ids).size > 0 ||
    #       ticket.assignee == user
    # end
    #
    # can [:create, :read], Reply do |reply|
    #   # at least one label_id overlap
    #   (reply.ticket.label_ids & user.label_ids).size > 0
    # end
  end
  #
  # def agent(user)
  #   # agents can reply to tickets that are locked by themselves or unlocked
  #   can [:create, :read], Reply, Reply.unlocked_for(user) do |reply|
  #     !reply.ticket.locked?(user)
  #   end
  #
  #   # agents can edit all users
  #   can :manage, User
  #
  #   can [:read], Ticket
  #   # agents can manage all tickets that are locked by themselves or unlocked
  #   can [:update, :destroy], Ticket, Ticket.unlocked_for(user) do |ticket|
  #     !ticket.locked?(user)
  #   end
  #
  #   # agent can create/destroy labelings for tickets locked by themselves or
  #   # unlocked
  #   can [:create, :destroy], Labeling, labelable_type: 'Ticket',
  #       labelable: { locked_by_id: [user.id, nil] }
  #
  #   can [:create, :destroy], Labeling, -> { where(labelable_type: 'User')
  #       .where.not(labelable_id: user.id) } do |labeling|
  #     labeling.labelable != user
  #   end
  #   can :manage, Rule
  #   can :manage, EmailAddress
  #   can :manage, Label
  #
  #   can :update, Tenant, id: Tenant.current_tenant.id
  # end
end
